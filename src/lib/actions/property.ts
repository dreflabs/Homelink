"use server";

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export async function createProperty(formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user) {
    return { success: false, error: "Unauthorized: Anda harus login." };
  }

  const role = (session.user as any).role;
  if (!role || (role !== "OWNER" && role !== "ADMIN" && role !== "SUPER_ADMIN")) {
    return { success: false, error: "Forbidden: Hanya Owner yang dapat membuat properti." };
  }

  // Obtain ownerId
  let ownerId = (session.user as any).id;
  
  if (!ownerId && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (user) {
      ownerId = user.id;
    } else {
      return { success: false, error: "Unauthorized: User not found in database." };
    }
  } else if (!ownerId) {
    return { success: false, error: "Unauthorized: Identitas pengguna tidak valid." };
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString() || "";
  const price = formData.get("price")?.toString();
  const rawType = formData.get("propertyType")?.toString() || formData.get("type")?.toString() || "HOUSE";
  const address = formData.get("address")?.toString();
  const latStr = formData.get("lat")?.toString() || "-6.2088";
  const lngStr = formData.get("lng")?.toString() || "106.8456";

  if (!title || !price || !address) {
    return { success: false, error: "Bad Request: Judul, harga, dan alamat wajib diisi." };
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return { success: false, error: "Bad Request: Harga tidak valid." };
  }

  const parsedLat = parseFloat(latStr) || -6.2088;
  const parsedLng = parseFloat(lngStr) || 106.8456;
  const normalizedType = rawType.toUpperCase();

  try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

    const property = await prisma.property.create({
      data: {
        title,
        slug,
        description,
        price: parsedPrice,
        propertyType: normalizedType,
        address,
        latitude: parsedLat,
        longitude: parsedLng,
        status: 'PENDING_REVIEW',
        ownerId,
      },
    });

    revalidatePath('/owner/properties');

    return {
      success: true,
      propertyId: property.id,
      message: "Properti berhasil dibuat."
    };
  } catch (error: any) {
    console.error("Failed to create property:", error);
    return { success: false, error: error.message || "Internal Server Error: Gagal menyimpan data properti." };
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
          AND p.status = 'PUBLISHED'
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
        status: 'PUBLISHED',
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

export async function getNearbyProperties(lat: number, lng: number, radiusKm: number = 5) {
  // Skeleton API call to fetch nearby properties
  // In a real application, you would use PostGIS or a similar geospatial DB extension to query by distance.
  // For now, we will just return mock data so the frontend logic is complete.
  return {
    success: true,
    data: [
      {
        id: "prop-1-db",
        title: "Rumah Mewah Minimalis (DB)",
        price: 15000000000,
        address: "0.5 km dari lokasi Anda",
        bedrooms: 4,
        bathrooms: 3,
        buildingArea: 350,
        media: [{ s3Url: "/property_1.jpg" }],
        status: "ACTIVE",
      },
      {
        id: "prop-2-db",
        title: "Apartemen Strategis (DB)",
        price: 3500000000,
        address: "1.2 km dari lokasi Anda",
        bedrooms: 2,
        bathrooms: 1,
        buildingArea: 85,
        media: [{ s3Url: "/property_2.jpg" }],
        status: "ACTIVE",
      }
    ]
  };
}
