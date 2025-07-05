import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getPointsBalance } from '@/lib/points';
import { ApiResponse } from '@/types';

// GET /api/points/balance - Get current user's points balance
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await requireAuth();
    const balance = await getPointsBalance(user.id);

    return NextResponse.json({
      success: true,
      data: balance,
    });
  } catch (error) {
    console.error('Get points balance error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 