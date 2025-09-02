import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { compute, dataAvailability } from "@/lib/0g";

// POST /api/agents/[id]/chat - Send message to agent
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;
    const body = await request.json();
    const { message, userAddress } = body;

    if (!message || !userAddress) {
      return NextResponse.json(
        { error: "Message and user address are required" },
        { status: 400 }
      );
    }

    // Get agent details
    const agent = await db
      .select()
      .from(schema.agents)
      .where(eq(schema.agents.id, agentId))
      .limit(1);

    if (agent.length === 0) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
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

    // Check user's access level
    const userAccess = await db
      .select({
        id: schema.userAgentAccess.id,
        tierId: schema.userAgentAccess.tierId,
        startDate: schema.userAgentAccess.startDate,
        endDate: schema.userAgentAccess.endDate,
        currentUsage: schema.userAgentAccess.currentUsage,
        tier: {
          name: schema.accessTiers.name,
          priceModel: schema.accessTiers.priceModel,
          amount: schema.accessTiers.amount,
          usageLimits: schema.accessTiers.usageLimits,
        },
      })
      .from(schema.userAgentAccess)
      .leftJoin(schema.accessTiers, eq(schema.userAgentAccess.tierId, schema.accessTiers.id))
      .where(
        and(
          eq(schema.userAgentAccess.userId, user[0].id),
          eq(schema.userAgentAccess.agentId, agentId)
        )
      )
      .limit(1);

    // Default to free tier if no access found
    let hasAccess = true;
    let remainingQueries = 5; // Default free queries
    let isPaidInteraction = false;

    if (userAccess.length > 0) {
      const access = userAccess[0];
      const usage = access.currentUsage ? JSON.parse(access.currentUsage) : {};
      const limits = access.tier?.usageLimits ? JSON.parse(access.tier.usageLimits) : {};
      
      if (limits.queriesPerDay && usage.queriesUsedToday >= limits.queriesPerDay) {
        hasAccess = false;
      }
      
      remainingQueries = Math.max(0, (limits.queriesPerDay || 0) - (usage.queriesUsedToday || 0));
      isPaidInteraction = access.tier?.amount > 0;
    } else {
      // Check daily free usage (simplified - in production, use proper date tracking)
      const todayInteractions = await db
        .select()
        .from(schema.agentInteractions)
        .where(
          and(
            eq(schema.agentInteractions.userId, user[0].id),
            eq(schema.agentInteractions.agentId, agentId),
            eq(schema.agentInteractions.isPaidInteraction, false)
          )
        );
      
      if (todayInteractions.length >= 5) {
        hasAccess = false;
        remainingQueries = 0;
      } else {
        remainingQueries = 5 - todayInteractions.length;
      }
    }

    if (!hasAccess) {
      return NextResponse.json(
        { 
          error: "Usage limit exceeded",
          remainingQueries: 0,
          needsUpgrade: true 
        },
        { status: 403 }
      );
    }

    // Generate AI response (simplified mock)
    const aiResponse = await generateAIResponse(message, agent[0]);

    // Save interaction
    await db.insert(schema.agentInteractions).values({
      userId: user[0].id,
      agentId: agentId,
      messageContent: message,
      responseContent: aiResponse,
      isPaidInteraction,
    });

    // Publish interaction data to 0G DA for real-time analytics
    try {
      await dataAvailability.publishAgentInteraction(agentId, user[0].id, {
        messageContent: message,
        responseContent: aiResponse,
        isPaidInteraction,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn('Failed to publish interaction to 0G DA:', error);
    }

    // Update usage tracking
    if (userAccess.length > 0) {
      const access = userAccess[0];
      const usage = access.currentUsage ? JSON.parse(access.currentUsage) : {};
      usage.queriesUsedToday = (usage.queriesUsedToday || 0) + 1;
      
      await db
        .update(schema.userAgentAccess)
        .set({
          currentUsage: JSON.stringify(usage),
        })
        .where(eq(schema.userAgentAccess.id, access.id));
    }

    return NextResponse.json({
      response: aiResponse,
      usage: {
        freeRemaining: Math.max(0, remainingQueries - 1),
        paidAccess: isPaidInteraction,
      },
    });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}

// AI response generator using 0G Compute
async function generateAIResponse(message: string, agent: { name: string; description: string; personaDescription?: string; directives?: string; conversationalTone?: string; baseModel: string }): Promise<string> {
  try {
    // Use 0G Compute for AI inference
    const response = await compute.generateResponse({
      model: agent.baseModel === 'conversational' ? 'gpt-3.5-turbo' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are ${agent.name}. ${agent.personaDescription || agent.description}. ${agent.directives || ''} Always respond in a ${agent.conversationalTone || 'professional'} tone.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process your request at the moment.";
  } catch (error) {
    console.error('0G Compute error, falling back to mock response:', error);
    
    // Fallback to mock responses if 0G Compute is unavailable
    const responses = [
      "That's an interesting question. Based on my knowledge base, I'd suggest looking into this from multiple angles.",
      "I understand your concern. Let me provide you with some insights based on my training data.",
      "Great question! Here's what I can tell you about that topic based on my specialized knowledge.",
      "Thanks for asking. This is exactly the kind of question I'm designed to help with.",
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return responses[Math.floor(Math.random() * responses.length)] + 
           ` As ${agent.name}, I'm specifically trained to help with ${agent.description.toLowerCase()}.`;
  }
}
