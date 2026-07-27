import { NextResponse } from 'next/server';
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Property ID is required' },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!property) {
      return NextResponse.json(
        { status: 'error', message: 'Property not found' },
        { status: 404 }
      );
    }

    const userRole = (session.user as any).role as string;
    const userId = session.user.id;
    const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
    const isOwner = property.ownerId === userId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { status: 'error', message: 'Forbidden: You do not have permission to view leads for this property' },
        { status: 403 }
      );
    }

    const leads = await prisma.lead.findMany({
      where: {
        propertyId: id,
      },
      include: {
        buyer: true,
      },
    });

    return NextResponse.json({
      status: 'success',
      data: leads,
    });
  } catch (error: any) {
    console.error('Error fetching property leads:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
