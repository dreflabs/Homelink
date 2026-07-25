import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    // TODO: Require authentication to get the actual user ID.
    // For now, we will just return all bookings or filter by status.

    const where = {
      isDeleted: false,
      ...(status && status !== 'ALL' ? { status } : {}),
    };

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        property: {
          include: {
            media: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      status: 'success',
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
