import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        media: true,
      }
    });

    if (!property) {
      return NextResponse.json(
        {
          status: 'fail',
          data: {
            message: 'Property not found'
          }
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: property
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
