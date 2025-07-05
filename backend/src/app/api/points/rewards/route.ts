import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse, CreateRewardRequest, RewardResponse } from '@/types';

// GET /api/points/rewards - Get all rewards for the current user
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<RewardResponse[]>>> {
  try {
    const user = await requireAuth();

    const rewards = await prisma.reward.findMany({
      where: { userId: user.id },
      orderBy: { priority: 'asc' },
    });

    const rewardsResponse: RewardResponse[] = rewards.map(reward => ({
      id: reward.id,
      title: reward.title,
      description: reward.description,
      cost: reward.cost,
      imageUrl: reward.imageUrl || undefined,
      showImage: reward.showImage,
      columnWidth: reward.columnWidth,
      priority: reward.priority || undefined,
      createdAt: reward.createdAt.toISOString(),
      updatedAt: reward.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: rewardsResponse,
    });
  } catch (error) {
    console.error('Get rewards error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/points/rewards - Create a new reward
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<RewardResponse>>> {
  try {
    const user = await requireAuth();
    const body: CreateRewardRequest = await request.json();

    if (!body.title || !body.description || body.cost === undefined) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and cost are required' },
        { status: 400 }
      );
    }

    const reward = await prisma.reward.create({
      data: {
        title: body.title,
        description: body.description,
        cost: body.cost,
        imageUrl: body.imageUrl,
        showImage: body.showImage ?? true,
        columnWidth: body.columnWidth ?? 1,
        priority: body.priority,
        userId: user.id,
      },
    });

    const rewardResponse: RewardResponse = {
      id: reward.id,
      title: reward.title,
      description: reward.description,
      cost: reward.cost,
      imageUrl: reward.imageUrl || undefined,
      showImage: reward.showImage,
      columnWidth: reward.columnWidth,
      priority: reward.priority || undefined,
      createdAt: reward.createdAt.toISOString(),
      updatedAt: reward.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: rewardResponse,
    });
  } catch (error) {
    console.error('Create reward error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 