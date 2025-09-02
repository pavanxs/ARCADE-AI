import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

// GET /api/games - Get all AI games
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "popularity";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // For now, return mock data since we don't have games in the database yet
    // In production, you would query the aiGames table
    const mockGames = [
      {
        id: "1",
        name: "AI Dungeon Master",
        description: "An AI-powered text-based RPG where the dungeon master adapts to your choices in real-time.",
        category: "Adventure",
        creator: "0x1234...5678",
        creatorName: "GameDev Studios",
        players: 1250,
        rating: 4.8,
        playTime: "30-60 min",
        difficulty: "Medium",
        tags: ["RPG", "Text-based", "Adaptive", "Story"],
        isLive: true,
        price: 0,
      },
      {
        id: "2",
        name: "Neural Chess",
        description: "Play chess against an AI that learns and adapts to your playing style throughout the game.",
        category: "Strategy",
        creator: "0x8765...4321",
        creatorName: "ChessAI Labs",
        players: 890,
        rating: 4.9,
        playTime: "15-45 min",
        difficulty: "Hard",
        tags: ["Chess", "Strategy", "Learning", "Competitive"],
        isLive: true,
        price: 0.1,
      },
      {
        id: "3",
        name: "Story Weaver",
        description: "Collaborative storytelling with AI where you and the AI create stories together.",
        category: "Creative",
        creator: "0x9876...1234",
        creatorName: "Creative AI",
        players: 2100,
        rating: 4.7,
        playTime: "20-40 min",
        difficulty: "Easy",
        tags: ["Creative", "Storytelling", "Collaborative", "Writing"],
        isLive: true,
        price: 0,
      },
    ];

    // Apply filters
    let filteredGames = mockGames;

    if (category && category !== "All") {
      filteredGames = filteredGames.filter(game => game.category === category);
    }

    if (search) {
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply sorting
    filteredGames.sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return parseInt(b.id) - parseInt(a.id);
        default: // popularity
          return b.players - a.players;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedGames = filteredGames.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      games: paginatedGames,
      total: filteredGames.length,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

// POST /api/games - Create new game (for future use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, launchUrl, creatorAddress } = body;

    // Validate required fields
    if (!name || !description || !launchUrl || !creatorAddress) {
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

    // Create game
    const [game] = await db
      .insert(schema.aiGames)
      .values({
        name,
        description,
        launchUrl,
        creatorId: user[0].id,
      })
      .returning();

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
