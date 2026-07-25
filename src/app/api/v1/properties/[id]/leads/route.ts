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
