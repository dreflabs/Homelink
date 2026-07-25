import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // get all favorites for now, ignoring buyerId filter for simulation
    const favorites = await prisma.savedProperty.findMany({
      include: { property: true },
    });

    return NextResponse.json({
      status: 'success',
      data: favorites,
    });
  } catch (error: any) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch favorites', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { propertyId, buyerId } = await request.json();

    if (!propertyId || !buyerId) {
      return NextResponse.json(
        { status: 'error', message: 'propertyId and buyerId are required' },
        { status: 400 }
      );
    }

    const savedProperty = await prisma.savedProperty.create({
      data: {
        propertyId,
        buyerId,
      },
    });

    return NextResponse.json({
      status: 'success',
      data: savedProperty,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to add favorite', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
