import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ status: 'fail', message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = session.user.id;
    const role = session.user.role;

    const where: any = {
      isDeleted: false,
      ...(status && status !== 'ALL' ? { status } : {}),
    };

    if (role === 'BUYER') {
      where.buyerId = userId;
    } else if (role === 'OWNER') {
      where.property = { ownerId: userId };
    }

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
