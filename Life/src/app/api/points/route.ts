import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (for testing)
let points = [
  {
    id: '1',
    categoryId: 'exercise',
    description: 'Morning workout',
    tasksCompleted: 1,
    pointsPerTask: 10,
    totalPoints: 10,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  const totalPoints = points.reduce((sum, point) => sum + point.totalPoints, 0);
  
  return NextResponse.json({
    success: true,
    data: {
      points: points,
      totalPoints: totalPoints
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newPoint = {
      id: Date.now().toString(),
      categoryId: body.categoryId,
      description: body.description,
      tasksCompleted: body.tasksCompleted || 1,
      pointsPerTask: body.pointsPerTask || 10,
      totalPoints: (body.tasksCompleted || 1) * (body.pointsPerTask || 10),
      date: body.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    points.push(newPoint);
    
    return NextResponse.json({
      success: true,
      data: newPoint
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to add points'
    }, { status: 400 });
  }
} 