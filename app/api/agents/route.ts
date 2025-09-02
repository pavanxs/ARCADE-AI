import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

// GET /api/agents - Get all published agents (marketplace)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // const category = searchParams.get("category");
    // const search = searchParams.get("search");
    // const priceMin = searchParams.get("priceMin");
    // const priceMax = searchParams.get("priceMax");
    // const sort = searchParams.get("sort") || "popularity";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build query conditions - disabled for now
    // const conditions = [eq(schema.agents.status, "published")];

    // Execute query
    const agents = await db
      .select({
        id: schema.agents.id,
        name: schema.agents.name,
        description: schema.agents.description,
        baseModel: schema.agents.baseModel,
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
      .where(eq(schema.agents.status, "published"))
      .orderBy(desc(schema.agents.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({
      agents,
      total: agents.length, // In production, you'd want a separate count query
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, baseModel, creatorAddress } = body;

    // Validate required fields
    if (!name || !description || !baseModel || !creatorAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.walletAddress, creatorAddress))
      .limit(1);

    if (user.length === 0) {
      const [newUser] = await db
        .insert(schema.users)
        .values({
          walletAddress: creatorAddress,
        })
        .returning();
      user = [newUser];
    }

    // Create agent
    const [agent] = await db
      .insert(schema.agents)
      .values({
        name,
        description,
        baseModel,
        creatorId: user[0].id,
        status: "draft",
      })
      .returning();

    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      { error: "Failed to create agent" },
      { status: 500 }
    );
  }
}
