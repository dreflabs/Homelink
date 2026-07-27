import { NextResponse } from 'next/server';
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const favorites = await prisma.savedProperty.findMany({
      where: { buyerId: session.user.id },
      include: { property: true },
    });

    return NextResponse.json({
      status: 'success',
      data: favorites,
    });
  } catch (error: any) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch favorites', details: 'Terjadi kesalahan internal. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { propertyId } = await request.json();

    if (!propertyId) {
      return NextResponse.json(
        { status: 'error', message: 'propertyId is required' },
        { status: 400 }
      );
    }

    const savedProperty = await prisma.savedProperty.create({
      data: {
        propertyId,
        buyerId: session.user.id,
      },
    });

    return NextResponse.json({
      status: 'success',
      data: savedProperty,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to add favorite', details: 'Terjadi kesalahan internal. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
