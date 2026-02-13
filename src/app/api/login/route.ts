import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simple test credentials (replace with database lookup later)
    const testEmail = process.env.TEST_LOGIN_EMAIL;
    const testPassword = process.env.TEST_LOGIN_PASSWORD;

    if (testEmail && testPassword && email === testEmail && password === testPassword) {
      // Generate a simple token (replace with JWT later)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      return NextResponse.json(
        {
          success: true,
          token,
          user: {
            email,
            id: 'test-user-1',
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid credentials',
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
