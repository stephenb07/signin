import { NextResponse } from 'next/server';
import { addUser } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const user = addUser(email, password);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
} 