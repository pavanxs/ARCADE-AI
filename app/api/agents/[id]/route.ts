import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";

// GET /api/agents/[id] - Get specific agent
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;

    const agent = await db
      .select({
        id: schema.agents.id,
        name: schema.agents.name,
        description: schema.agents.description,
        baseModel: schema.agents.baseModel,
        status: schema.agents.status,
        personaDescription: schema.agents.personaDescription,
        directives: schema.agents.directives,
        conversationalTone: schema.agents.conversationalTone,
        creatorId: schema.agents.creatorId,
        createdAt: schema.agents.createdAt,
        updatedAt: schema.agents.updatedAt,
        creator: {
          id: schema.users.id,
          walletAddress: schema.users.walletAddress,
          username: schema.users.username,
        },
      })
      .from(schema.agents)
      .leftJoin(schema.users, eq(schema.agents.creatorId, schema.users.id))
      .where(eq(schema.agents.id, agentId))
      .limit(1);

    if (agent.length === 0) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    // Get access tiers
    const tiers = await db
      .select()
      .from(schema.accessTiers)
      .where(eq(schema.accessTiers.agentId, agentId));

    // Get knowledge base documents
    const documents = await db
      .select()
      .from(schema.knowledgeBaseDocuments)
      .where(eq(schema.knowledgeBaseDocuments.agentId, agentId));

    return NextResponse.json({
      ...agent[0],
      tiers,
      documents,
    });
  } catch (error) {
    console.error("Error fetching agent:", error);
    return NextResponse.json(
      { error: "Failed to fetch agent" },
      { status: 500 }
    );
  }
}

// PUT /api/agents/[id] - Update agent
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;
    const body = await request.json();
    
    const {
      name,
      description,
      baseModel,
      personaDescription,
      directives,
      conversationalTone,
      creatorAddress,
    } = body;

    // Verify ownership
    const agent = await db
      .select({
        id: schema.agents.id,
        creatorId: schema.agents.creatorId,
        creator: {
          walletAddress: schema.users.walletAddress,
        },
      })
      .from(schema.agents)
      .leftJoin(schema.users, eq(schema.agents.creatorId, schema.users.id))
      .where(eq(schema.agents.id, agentId))
      .limit(1);

    if (agent.length === 0) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    if (agent[0].creator?.walletAddress !== creatorAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Update agent
    const [updatedAgent] = await db
      .update(schema.agents)
      .set({
        name: name || agent[0].name,
        description: description || agent[0].description,
        baseModel: baseModel || agent[0].baseModel,
        personaDescription,
        directives,
        conversationalTone,
        updatedAt: new Date(),
      })
      .where(eq(schema.agents.id, agentId))
      .returning();

    return NextResponse.json(updatedAgent);
  } catch (error) {
    console.error("Error updating agent:", error);
    return NextResponse.json(
      { error: "Failed to update agent" },
      { status: 500 }
    );
  }
}

// DELETE /api/agents/[id] - Delete agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;
    const { searchParams } = new URL(request.url);
    const creatorAddress = searchParams.get("creatorAddress");

    if (!creatorAddress) {
      return NextResponse.json(
        { error: "Creator address required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const agent = await db
      .select({
        id: schema.agents.id,
        creator: {
          walletAddress: schema.users.walletAddress,
        },
      })
      .from(schema.agents)
      .leftJoin(schema.users, eq(schema.agents.creatorId, schema.users.id))
      .where(eq(schema.agents.id, agentId))
      .limit(1);

    if (agent.length === 0) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    if (agent[0].creator?.walletAddress !== creatorAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete agent (cascade will handle related records)
    await db.delete(schema.agents).where(eq(schema.agents.id, agentId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting agent:", error);
    return NextResponse.json(
      { error: "Failed to delete agent" },
      { status: 500 }
    );
  }
}
