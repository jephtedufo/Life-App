import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse, UpdateHabitStatusRequest, HabitStatusResponse } from '@/types';

// PUT /api/habits/[id]/status - Update habit status for a specific date
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<HabitStatusResponse>>> {
  try {
    const user = await requireAuth();
    const { id: habitId } = params;
    const { status, date } = await request.json() as UpdateHabitStatusRequest & { date: string };

    if (!status || !date) {
      return NextResponse.json(
        { success: false, error: 'Status and date are required' },
        { status: 400 }
      );
    }

    // Verify the habit belongs to the user
    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId: user.id },
    });

    if (!habit) {
      return NextResponse.json(
        { success: false, error: 'Habit not found' },
        { status: 404 }
      );
    }

    // Update or create habit status
    const habitStatus = await prisma.habitStatus.upsert({
      where: {
        habitId_date: {
          habitId,
          date,
        },
      },
      update: {
        status,
      },
      create: {
        habitId,
        date,
        status,
      },
    });

    const statusResponse: HabitStatusResponse = {
      id: habitStatus.id,
      habitId: habitStatus.habitId,
      date: habitStatus.date,
      status: habitStatus.status,
      createdAt: habitStatus.createdAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: statusResponse,
    });
  } catch (error) {
    console.error('Update habit status error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/habits/[id]/status - Get habit statuses for a specific habit
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<HabitStatusResponse[]>>> {
  try {
    const user = await requireAuth();
    const { id: habitId } = params;

    // Verify the habit belongs to the user
    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId: user.id },
    });

    if (!habit) {
      return NextResponse.json(
        { success: false, error: 'Habit not found' },
        { status: 404 }
      );
    }

    const statuses = await prisma.habitStatus.findMany({
      where: { habitId },
      orderBy: { date: 'desc' },
    });

    const statusesResponse: HabitStatusResponse[] = statuses.map((status: any) => ({
      id: status.id,
      habitId: status.habitId,
      date: status.date,
      status: status.status,
      createdAt: status.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: statusesResponse,
    });
  } catch (error) {
    console.error('Get habit statuses error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 