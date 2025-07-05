import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse, CreatePointLogRequest, PointLogResponse } from '@/types';

// GET /api/points/logs - Get all point logs for the current user
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<PointLogResponse[]>>> {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const date = searchParams.get('date');

    const where: any = { userId: user.id };
    if (categoryId) where.categoryId = categoryId;
    if (date) where.date = date;

    const logs = await prisma.pointLog.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const logsResponse: PointLogResponse[] = logs.map(log => ({
      id: log.id,
      categoryId: log.categoryId,
      description: log.description,
      tasksCompleted: log.tasksCompleted,
      pointsPerTask: log.pointsPerTask,
      totalPoints: log.totalPoints,
      date: log.date,
      createdAt: log.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: logsResponse,
    });
  } catch (error) {
    console.error('Get point logs error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/points/logs - Create a new point log
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<PointLogResponse>>> {
  try {
    const user = await requireAuth();
    const body: CreatePointLogRequest = await request.json();

    if (!body.categoryId || !body.description || body.tasksCompleted === undefined || body.pointsPerTask === undefined) {
      return NextResponse.json(
        { success: false, error: 'categoryId, description, tasksCompleted, and pointsPerTask are required' },
        { status: 400 }
      );
    }

    // Verify the category belongs to the user
    const category = await prisma.taskCategory.findFirst({
      where: { id: body.categoryId, userId: user.id },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const totalPoints = body.tasksCompleted * body.pointsPerTask;
    const date = body.date || new Date().toISOString().split('T')[0];

    const log = await prisma.pointLog.create({
      data: {
        categoryId: body.categoryId,
        description: body.description,
        tasksCompleted: body.tasksCompleted,
        pointsPerTask: body.pointsPerTask,
        totalPoints,
        date,
        userId: user.id,
      },
    });

    const logResponse: PointLogResponse = {
      id: log.id,
      categoryId: log.categoryId,
      description: log.description,
      tasksCompleted: log.tasksCompleted,
      pointsPerTask: log.pointsPerTask,
      totalPoints: log.totalPoints,
      date: log.date,
      createdAt: log.createdAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: logResponse,
    });
  } catch (error) {
    console.error('Create point log error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 