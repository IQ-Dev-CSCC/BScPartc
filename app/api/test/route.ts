import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const data = { message: 'Hello, world!' };
    return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const response = { received: body };
    return NextResponse.json(response, { status: 200 });
}