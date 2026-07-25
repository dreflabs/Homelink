import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";



export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    const { propertyId } = await params;

    if (!propertyId) {
      return NextResponse.json(
        { status: 'error', message: 'propertyId is required' },
        { status: 400 }
      );
    }

    await prisma.savedProperty.deleteMany({
      where: {
        propertyId,
      },
    });

    return NextResponse.json(
      { status: 'success', message: 'Favorite removed successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to remove favorite', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
