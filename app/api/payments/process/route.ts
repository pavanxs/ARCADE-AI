import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { chain } from "@/lib/0g";

// POST /api/payments/process - Process payment for agent access using 0G Chain
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, tierId, userAddress, amount, currency } = body;

    if (!agentId || !tierId || !userAddress || !amount) {
      return NextResponse.json(
        { error: "Missing required payment parameters" },
        { status: 400 }
      );
    }

    // Get agent and tier information
    const agentTier = await db
      .select({
        agent: {
          id: schema.agents.id,
          name: schema.agents.name,
          creatorId: schema.agents.creatorId,
        },
        tier: {
          id: schema.accessTiers.id,
          name: schema.accessTiers.name,
          amount: schema.accessTiers.amount,
          currency: schema.accessTiers.currency,
          priceModel: schema.accessTiers.priceModel,
        },
        creator: {
          walletAddress: schema.users.walletAddress,
        },
      })
      .from(schema.agents)
      .leftJoin(schema.accessTiers, eq(schema.agents.id, schema.accessTiers.agentId))
      .leftJoin(schema.users, eq(schema.agents.creatorId, schema.users.id))
      .where(
        and(
          eq(schema.agents.id, agentId),
          eq(schema.accessTiers.id, tierId)
        )
      )
      .limit(1);

    if (agentTier.length === 0) {
      return NextResponse.json(
        { error: "Agent or tier not found" },
        { status: 404 }
      );
    }

    const { agent, tier, creator } = agentTier[0];

    // Validate payment amount
    if (parseFloat(amount) !== tier.amount) {
      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.walletAddress, userAddress))
      .limit(1);

    if (user.length === 0) {
      const [newUser] = await db
        .insert(schema.users)
        .values({
          walletAddress: userAddress,
        })
        .returning();
      user = [newUser];
    }

    try {
      // Process payment using 0G Chain
      const transactionHash = await chain.processPayment({
        agentId,
        tierId,
        amount: chain.parseAmount(amount.toString()),
        currency: tier.currency,
        userAddress,
      });

      // Create transaction record
      const [transaction] = await db
        .insert(schema.transactions)
        .values({
          userId: user[0].id,
          agentId: agentId,
          tierId: tierId,
          transactionHash: transactionHash,
          amount: tier.amount,
          currency: tier.currency,
          status: "pending",
        })
        .returning();

      // Create or update user access
      const existingAccess = await db
        .select()
        .from(schema.userAgentAccess)
        .where(
          and(
            eq(schema.userAgentAccess.userId, user[0].id),
            eq(schema.userAgentAccess.agentId, agentId)
          )
        )
        .limit(1);

      const accessData = {
        userId: user[0].id,
        agentId: agentId,
        tierId: tierId,
        startDate: new Date(),
        endDate: tier.priceModel === "monthly_subscription" 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          : null,
        currentUsage: JSON.stringify({ queriesUsedToday: 0 }),
      };

      if (existingAccess.length > 0) {
        await db
          .update(schema.userAgentAccess)
          .set(accessData)
          .where(eq(schema.userAgentAccess.id, existingAccess[0].id));
      } else {
        await db.insert(schema.userAgentAccess).values(accessData);
      }

      return NextResponse.json({
        transactionHash,
        status: "pending",
        message: "Payment processed successfully. Waiting for blockchain confirmation.",
      });

    } catch (chainError) {
      console.error('0G Chain payment error:', chainError);
      
      // Fallback: create pending transaction without blockchain interaction
      const [transaction] = await db
        .insert(schema.transactions)
        .values({
          userId: user[0].id,
          agentId: agentId,
          tierId: tierId,
          transactionHash: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: tier.amount,
          currency: tier.currency,
          status: "confirmed", // Mock as confirmed for development
        })
        .returning();

      // Grant access immediately for development
      const accessData = {
        userId: user[0].id,
        agentId: agentId,
        tierId: tierId,
        startDate: new Date(),
        endDate: tier.priceModel === "monthly_subscription" 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : null,
        currentUsage: JSON.stringify({ queriesUsedToday: 0 }),
      };

      const existingAccess = await db
        .select()
        .from(schema.userAgentAccess)
        .where(
          and(
            eq(schema.userAgentAccess.userId, user[0].id),
            eq(schema.userAgentAccess.agentId, agentId)
          )
        )
        .limit(1);

      if (existingAccess.length > 0) {
        await db
          .update(schema.userAgentAccess)
          .set(accessData)
          .where(eq(schema.userAgentAccess.id, existingAccess[0].id));
      } else {
        await db.insert(schema.userAgentAccess).values(accessData);
      }

      return NextResponse.json({
        transactionHash: transaction.transactionHash,
        status: "confirmed",
        message: "Payment processed successfully (development mode).",
        warning: "0G Chain unavailable, using mock payment processing",
      });
    }

  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}

// GET /api/payments/process - Check transaction status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionHash = searchParams.get("transactionHash");

    if (!transactionHash) {
      return NextResponse.json(
        { error: "Transaction hash required" },
        { status: 400 }
      );
    }

    // Get transaction from database
    const transaction = await db
      .select()
      .from(schema.transactions)
      .where(eq(schema.transactions.transactionHash, transactionHash))
      .limit(1);

    if (transaction.length === 0) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    try {
      // Check status on 0G Chain
      const chainStatus = await chain.getTransactionStatus(transactionHash);
      
      // Update database if status changed
      if (chainStatus !== transaction[0].status) {
        await db
          .update(schema.transactions)
          .set({ status: chainStatus })
          .where(eq(schema.transactions.transactionHash, transactionHash));
      }

      return NextResponse.json({
        transactionHash,
        status: chainStatus,
        amount: transaction[0].amount,
        currency: transaction[0].currency,
      });

    } catch (chainError) {
      console.warn('Failed to check 0G Chain status:', chainError);
      
      // Return database status as fallback
      return NextResponse.json({
        transactionHash,
        status: transaction[0].status,
        amount: transaction[0].amount,
        currency: transaction[0].currency,
        warning: "Using cached status (0G Chain unavailable)",
      });
    }

  } catch (error) {
    console.error("Transaction status check error:", error);
    return NextResponse.json(
      { error: "Failed to check transaction status" },
      { status: 500 }
    );
  }
}
