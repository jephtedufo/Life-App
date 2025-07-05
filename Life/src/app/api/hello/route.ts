import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello from Life App Backend!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Data received successfully!',
    receivedData: body,
    timestamp: new Date().toISOString(),
    status: 'success'
  });
} 