import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (for testing)
let habits = [
  {
    id: '1',
    name: 'Exercise',
    description: 'Daily workout',
    repeatDays: [1, 2, 3, 4, 5],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: habits
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newHabit = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || '',
      repeatDays: body.repeatDays || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    habits.push(newHabit);
    
    return NextResponse.json({
      success: true,
      data: newHabit
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create habit'
    }, { status: 400 });
  }
} 