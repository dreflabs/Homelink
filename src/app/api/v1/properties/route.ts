import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { z } from 'zod';
import { auth } from "@/lib/auth";

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  propertyType: z.enum(['HOUSE', 'APARTMENT', 'LAND']),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  latitude: z.number(),
  longitude: z.number(),
  ownerId: z.string().uuid('Invalid owner ID')
});



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const cursor = searchParams.get('cursor');

    const ownerId = searchParams.get('ownerId');
    const status = searchParams.get('status');
    const propertyType = searchParams.get('propertyType');
    const q = searchParams.get('q');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minLat = searchParams.get('minLat');
    const maxLat = searchParams.get('maxLat');
    const minLng = searchParams.get('minLng');
    const maxLng = searchParams.get('maxLng');

    const where: any = {
      isDeleted: false,
      ...(status ? { status } : { status: 'PUBLISHED' }),
      ...(ownerId ? { ownerId } : {}),
      ...(propertyType ? { propertyType } : {})
    };

    if (q) {
      where.title = { contains: q, mode: 'insensitive' };
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (minLat || maxLat) {
      where.latitude = {};
      if (minLat) where.latitude.gte = parseFloat(minLat);
      if (maxLat) where.latitude.lte = parseFloat(maxLat);
    }
    if (minLng || maxLng) {
      where.longitude = {};
      if (minLng) where.longitude.gte = parseFloat(minLng);
      if (maxLng) where.longitude.lte = parseFloat(maxLng);
    }

    const properties = await prisma.property.findMany({
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      where,
      orderBy: { createdAt: 'desc' },
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

    let nextCursor = null;
    if (properties.length > limit) {
      const nextItem = properties.pop();
      nextCursor = nextItem?.id;
    }

    return NextResponse.json({
      status: 'success',
      data: properties,
      meta: {
        nextCursor,
        limit,
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ status: 'fail', message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = propertySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          status: 'fail',
          data: validatedData.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    // Insert into database using Prisma
    const property = await prisma.property.create({
      data: {
        title: validatedData.data.title,
        slug: validatedData.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7),
        description: validatedData.data.description,
        price: validatedData.data.price,
        propertyType: validatedData.data.propertyType,
        address: validatedData.data.address,
        latitude: validatedData.data.latitude,
        longitude: validatedData.data.longitude,
        ownerId: session.user.id,
        status: 'PENDING'
      }
    });

    return NextResponse.json(
      {
        status: 'success',
        data: property
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
