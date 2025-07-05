import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse, CreateTaskCategoryRequest, TaskCategoryResponse } from '@/types';

// GET /api/points/categories - Get all task categories for the current user
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<TaskCategoryResponse[]>>> {
  try {
    const user = await requireAuth();

    const categories = await prisma.taskCategory.findMany({
      where: { userId: user.id },
      orderBy: { priority: 'asc' },
    });

    const categoriesResponse: TaskCategoryResponse[] = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description || undefined,
      defaultPointValue: category.defaultPointValue,
      color: category.color,
      priority: category.priority || undefined,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: categoriesResponse,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/points/categories - Create a new task category
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<TaskCategoryResponse>>> {
  try {
    const user = await requireAuth();
    const body: CreateTaskCategoryRequest = await request.json();

    if (!body.name || body.defaultPointValue === undefined || !body.color) {
      return NextResponse.json(
        { success: false, error: 'Name, defaultPointValue, and color are required' },
        { status: 400 }
      );
    }

    const category = await prisma.taskCategory.create({
      data: {
        name: body.name,
        description: body.description,
        defaultPointValue: body.defaultPointValue,
        color: body.color,
        priority: body.priority,
        userId: user.id,
      },
    });

    const categoryResponse: TaskCategoryResponse = {
      id: category.id,
      name: category.name,
      description: category.description || undefined,
      defaultPointValue: category.defaultPointValue,
      color: category.color,
      priority: category.priority || undefined,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: categoryResponse,
    });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 