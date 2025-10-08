/**
 * Chat API Route
 * Uses 0G Compute Network for AI inference
 */

import { NextRequest, NextResponse } from 'next/server';
import { zeroGBroker } from '@/lib/0g/broker';

export interface ChatRequestBody {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  provider?: string;
}

// POST /api/chat - Send chat message using 0G network
export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { messages, model, provider } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Validate message format
    for (const message of messages) {
      if (!message.role || !message.content) {
        return NextResponse.json(
          { error: 'Each message must have role and content' },
          { status: 400 }
        );
      }

      if (!['user', 'assistant'].includes(message.role)) {
        return NextResponse.json(
          { error: 'Message role must be either "user" or "assistant"' },
          { status: 400 }
        );
      }
    }

    // Get current balance before proceeding
    const balance = await zeroGBroker.getBalance();

    // Check if balance is sufficient (rough estimate)
    const estimatedTokens = messages.reduce((total, msg) => total + msg.content.length, 0) / 4; // Rough token estimate
    const estimatedCost = estimatedTokens * 0.000001; // Very rough cost estimate in OG

    if (parseFloat(balance) < estimatedCost) {
      return NextResponse.json(
        {
          error: 'Insufficient balance',
          balance,
          estimatedCost,
          message: 'Please fund your account before continuing'
        },
        { status: 402 }
      );
    }

    // Send request to 0G network
    const response = await zeroGBroker.sendChatRequest({
      messages,
      model,
      provider,
    });

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: response.content,
      },
      chatId: response.chatId,
      verified: response.isValid,
      balance: await zeroGBroker.getBalance(),
    });

  } catch (error) {
    console.error('Chat API error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Insufficient balance for request headers')) {
        return NextResponse.json(
          {
            error: 'Insufficient balance for request headers',
            message: 'You need at least 3.26 OG tokens to use AI services. Please fund your account.',
            needsFunding: true
          },
          { status: 402 }
        );
      }

      if (error.message.includes('No AI services are currently available')) {
        return NextResponse.json(
          { error: 'No AI services currently available' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

// GET /api/chat - Get available services and balance
export async function GET() {
  try {
    // Check if broker is initialized first
    await zeroGBroker.initialize();

    const [services, balance] = await Promise.all([
      zeroGBroker.getAvailableServices(),
      zeroGBroker.getBalance(),
    ]);

    // Services are now properly formatted objects, just convert BigInt to strings
    const serializedServices = services.map((service: any) => ({
      ...service,
      inputPrice: service.inputPrice.toString(),
      outputPrice: service.outputPrice.toString(),
      updatedAt: service.updatedAt.toString(),
    }));

    const response = {
      services: serializedServices,
      balance: String(balance), // Ensure balance is a string
      initialized: true,
    };
    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API GET error:', error);
    return NextResponse.json(
      {
        error: 'Failed to initialize 0G broker',
        details: error instanceof Error ? error.message : 'Unknown error',
        initialized: false
      },
      { status: 500 }
    );
  }
}
