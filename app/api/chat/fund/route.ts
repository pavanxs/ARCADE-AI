/**
 * Funding API Route
 * Handles account funding for 0G network
 */

import { NextRequest, NextResponse } from 'next/server';
import { zeroGBroker } from '@/lib/0g/broker';

export interface FundRequestBody {
  amount: number;
}

// POST /api/chat/fund - Fund 0G account
export async function POST(request: NextRequest) {
  try {
    const body: FundRequestBody = await request.json();
    const { amount } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    if (amount > 100) {
      return NextResponse.json(
        { error: 'Amount cannot exceed 100 OG tokens' },
        { status: 400 }
      );
    }

    // Fund the account
    await zeroGBroker.fundAccount(amount);

    // Get updated balance
    const balance = await zeroGBroker.getBalance();

    return NextResponse.json({
      success: true,
      amount,
      balance,
      message: `Successfully funded account with ${amount} OG tokens`,
    });

  } catch (error) {
    console.error('Funding API error:', error);

    if (error instanceof Error) {
      if (error.message.includes('insufficient funds')) {
        return NextResponse.json(
          { error: 'Insufficient funds in wallet to fund account' },
          { status: 402 }
        );
      }

      if (error.message.includes('user rejected')) {
        return NextResponse.json(
          { error: 'Transaction rejected by user' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fund account' },
      { status: 500 }
    );
  }
}

// GET /api/chat/fund - Get current balance
export async function GET() {
  try {
    const balance = await zeroGBroker.getBalance();

    return NextResponse.json({
      balance,
    });

  } catch (error) {
    console.error('Funding API GET error:', error);
    return NextResponse.json(
      { error: 'Failed to get balance' },
      { status: 500 }
    );
  }
}
