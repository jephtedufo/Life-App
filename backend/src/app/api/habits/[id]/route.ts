import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse, UpdateHabitRequest, HabitResponse } from '@/types';

// GET /api/habits/[id] - Get a specific habit
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<HabitResponse>>> {
  try {
    const user = await requireAuth();
    const { id } = params;

    const habit = await prisma.habit.findFirst({
      where: { id, userId: user.id },
    });

    if (!habit) {
      return NextResponse.json(
        { success: false, error: 'Habit not found' },
        { status: 404 }
      );
    }

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
    console.error('Get habit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/habits/[id] - Update a habit
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<HabitResponse>>> {
  try {
    const user = await requireAuth();
    const { id } = params;
    const body: UpdateHabitRequest = await request.json();

    const habit = await prisma.habit.findFirst({
      where: { id, userId: user.id },
    });

    if (!habit) {
      return NextResponse.json(
        { success: false, error: 'Habit not found' },
        { status: 404 }
      );
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        repeatDays: body.repeatDays ? JSON.stringify(body.repeatDays) : undefined,
      },
    });

    const habitResponse: HabitResponse = {
      id: updatedHabit.id,
      name: updatedHabit.name,
      description: updatedHabit.description || undefined,
      repeatDays: JSON.parse(updatedHabit.repeatDays),
      createdAt: updatedHabit.createdAt.toISOString(),
      updatedAt: updatedHabit.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: habitResponse,
    });
  } catch (error) {
    console.error('Update habit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/habits/[id] - Delete a habit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await requireAuth();
    const { id } = params;

    const habit = await prisma.habit.findFirst({
      where: { id, userId: user.id },
    });

    if (!habit) {
      return NextResponse.json(
        { success: false, error: 'Habit not found' },
        { status: 404 }
      );
    }

    await prisma.habit.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Habit deleted successfully' },
    });
  } catch (error) {
    console.error('Delete habit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 