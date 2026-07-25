import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Property ID is required' },
        { status: 400 }
      );
    }

    const count = await prisma.propertyViewLog.count({
      where: {
        propertyId: id,
      },
    });

    return NextResponse.json({
      status: 'success',
      data: {
        views: count,
      },
    });
  } catch (error: any) {
    console.error('Error fetching property analytics:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
