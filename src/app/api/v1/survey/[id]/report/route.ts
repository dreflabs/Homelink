import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { status: 'error', message: 'Not Implemented' },
    { status: 501 }
  );
}
