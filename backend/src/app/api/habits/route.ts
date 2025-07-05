import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse, CreateHabitRequest, HabitResponse } from '@/types';

// GET /api/habits - Get all habits for the current user
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<HabitResponse[]>>> {
  try {
    const user = await requireAuth();

    const habits = await prisma.habit.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const habitsResponse: HabitResponse[] = habits.map((habit: any) => ({
      id: habit.id,
      name: habit.name,
      description: habit.description || undefined,
      repeatDays: JSON.parse(habit.repeatDays),
      createdAt: habit.createdAt.toISOString(),
      updatedAt: habit.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: habitsResponse,
    });
  } catch (error) {
    console.error('Get habits error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/habits - Create a new habit
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<HabitResponse>>> {
  try {
    const user = await requireAuth();
    const body: CreateHabitRequest = await request.json();

    if (!body.name || !body.repeatDays) {
      return NextResponse.json(
        { success: false, error: 'Name and repeatDays are required' },
        { status: 400 }
      );
    }

    const habit = await prisma.habit.create({
      data: {
        name: body.name,
        description: body.description,
        repeatDays: JSON.stringify(body.repeatDays),
        userId: user.id,
      },
    });

    const habitResponse: HabitResponse = {
      id: habit.id,
      name: habit.name,
      description: habit.description || undefined,
      repeatDays: JSON.parse(habit.repeatDays),
      createdAt: habit.createdAt.toISOString(),
      updatedAt: habit.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: habitResponse,
    });
  } catch (error) {
    console.error('Create habit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 