"use server";

import { auth } from '../auth';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createProperty(formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user) {
    throw new Error("Unauthorized: Anda harus login.");
  }

  const role = (session.user as any).role;
  if (role && role !== "OWNER") {
    throw new Error("Forbidden: Hanya Owner yang dapat membuat properti.");
  }

  // Obtain ownerId
  let ownerId = (session.user as any).id;
  
  // Fallback if ID is not available in session but email is
  if (!ownerId && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (user) {
      ownerId = user.id;
    } else {
      // Fallback for mock user in auth.ts
      ownerId = "1";
    }
  } else if (!ownerId) {
     throw new Error("Unauthorized: Identitas pengguna tidak valid.");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const price = formData.get("price")?.toString();
  const type = formData.get("type")?.toString();
  const address = formData.get("address")?.toString();
  const lat = formData.get("lat")?.toString();
  const lng = formData.get("lng")?.toString();

  if (!title || !description || !price || !type || !address || !lat || !lng) {
    throw new Error("Bad Request: Data properti tidak lengkap.");
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    throw new Error("Bad Request: Harga tidak valid.");
  }

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  
  if (isNaN(parsedLat) || isNaN(parsedLng)) {
    throw new Error("Bad Request: Koordinat (Latitude/Longitude) tidak valid.");
  }

  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parsedPrice,
        propertyType: type,
        address,
        latitude: parsedLat,
        longitude: parsedLng,
        status: 'PENDING',
        ownerId,
      },
    });

    revalidatePath('/owner/properties');

    return {
      success: true,
      property,
    };
  } catch (error: any) {
    console.error("Failed to create property:", error);
    throw new Error("Internal Server Error: Gagal menyimpan data properti.");
  }
}

const SearchPropertiesSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.number().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  radiusInKm: z.number().optional().default(10)
});

export async function searchProperties(params: z.infer<typeof SearchPropertiesSchema>) {
  const result = SearchPropertiesSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`Invalid search parameters: ${result.error.message}`);
  }

  const { query, type, minPrice, maxPrice, bedrooms, lat, lng, radiusInKm } = result.data;

  if (lat !== undefined && lng !== undefined) {
    const rawProperties = await prisma.$queryRaw`
      SELECT * FROM (
        SELECT p.id, p.title, p.description, p.price, p."propertyType", p.bedrooms, p.bathrooms, p."surfaceArea", p."buildingArea", p.address, p.latitude, p.longitude, p.status,
          (6371 * acos(cos(radians(${lat})) * cos(radians(p.latitude)) *
          cos(radians(p.longitude) - radians(${lng})) +
          sin(radians(${lat})) * sin(radians(p.latitude)))) AS distance
        FROM "Property" p
        WHERE p."isDeleted" = false
          AND p.status = 'PENDING'
          ${type ? Prisma.sql`AND p."propertyType" = ${type}` : Prisma.empty}
          ${bedrooms !== undefined ? Prisma.sql`AND p.bedrooms >= ${bedrooms}` : Prisma.empty}
          ${minPrice !== undefined ? Prisma.sql`AND p.price >= ${minPrice}` : Prisma.empty}
          ${maxPrice !== undefined ? Prisma.sql`AND p.price <= ${maxPrice}` : Prisma.empty}
          ${query ? Prisma.sql`AND p.title ILIKE ${`%${query}%`}` : Prisma.empty}
      ) AS sub
      WHERE distance <= ${radiusInKm}
      ORDER BY distance ASC
      LIMIT 50;
    `;
    return rawProperties;
  } else {
    const properties = await prisma.property.findMany({
      where: {
        isDeleted: false,
        status: 'PENDING',
        ...(type && { propertyType: type }),
        ...(bedrooms !== undefined && { bedrooms: { gte: bedrooms } }),
        ...(minPrice !== undefined && { price: { gte: minPrice } }),
        ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
        ...(query && { title: { contains: query, mode: 'insensitive' } })
      },
      take: 50
    });
    return properties;
  }
}

const SubmitLeadSchema = z.object({
  propertyId: z.string(),
  interactionType: z.string()
});

export async function submitLead(params: z.infer<typeof SubmitLeadSchema>) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const result = SubmitLeadSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`Invalid parameters: ${result.error.message}`);
  }

  const buyerId = (session.user as any).id || "1"; // fallback for mock
  const lead = await prisma.lead.create({
    data: {
      propertyId: result.data.propertyId,
      buyerId,
      interactionType: result.data.interactionType,
    }
  });

  return { success: true, lead };
}

const SubmitBookingSchema = z.object({
  propertyId: z.string(),
  surveyDate: z.coerce.date(),
  timeSlot: z.string()
});

export async function submitBooking(params: z.infer<typeof SubmitBookingSchema>) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const result = SubmitBookingSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`Invalid parameters: ${result.error.message}`);
  }

  const buyerId = (session.user as any).id || "1";
  const booking = await prisma.booking.create({
    data: {
      propertyId: result.data.propertyId,
      buyerId,
      surveyDate: result.data.surveyDate,
      timeSlot: result.data.timeSlot,
    }
  });

  return { success: true, booking };
}

const SaveSearchSchema = z.object({
  name: z.string(),
  query: z.string() // json string or query string
});

export async function saveSearch(params: z.infer<typeof SaveSearchSchema>) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const result = SaveSearchSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`Invalid parameters: ${result.error.message}`);
  }

  const userId = (session.user as any).id || "1";
  const savedSearch = await prisma.savedSearch.create({
    data: {
      userId,
      name: result.data.name,
      query: result.data.query,
    }
  });

  return { success: true, savedSearch };
}
