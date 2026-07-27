import { NextResponse } from 'next/server';

export async function PATCH() {
  return NextResponse.json(
    { status: 'error', message: 'Not Implemented' },
    { status: 501 }
  );
}
