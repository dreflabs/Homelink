import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateSchema = z.object({ status: z.string().min(1) });
    const parsedBody = updateSchema.safeParse(await request.json());
    if (!parsedBody.success) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }
    const { status } = parsedBody.data;
    const resolvedParams = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        buyerId: true,
        property: {
          select: { ownerId: true },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    const userRole = (session.user as any).role as string;
    const userId = session.user.id;
    const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
    const isBuyer = booking.buyerId === userId;
    const isOwner = booking.property.ownerId === userId;

    if (!isAdmin && !isBuyer && !isOwner) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: You do not have permission to update this booking' },
        { status: 403 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: resolvedParams.id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
