import { NextRequest, NextResponse } from 'next/server';

import { createSession, deleteSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { token, role } = await req.json();

    if (!token || !role) {
      return NextResponse.json(
        { message: 'Token and role are required' },
        { status: 400 }
      );
    }

    await createSession({ role, token });

    return NextResponse.json({ message: 'Session created' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await deleteSession();

  return NextResponse.json({ message: 'Session deleted' }, { status: 200 });
}
