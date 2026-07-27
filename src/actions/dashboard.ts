"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

// --- Validations ---
const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").optional(),
  email: z.string().email("Format email tidak valid").optional(),
});

const UpdateBookingStatusSchema = z.object({
  status: z.enum(["CONFIRMED", "REJECTED", "CANCELLED", "COMPLETED", "PENDING"]),
});

const UpdatePropertySchema = z.object({
  title: z.string().min(5, "Judul terlalu pendek").optional(),
  description: z.string().min(10, "Deskripsi terlalu pendek").optional(),
  price: z.coerce.number().positive("Harga harus valid").optional(),
  propertyType: z.string().optional(),
  address: z.string().min(5, "Alamat terlalu pendek").optional(),
});

// --- Role Check Helpers ---
function enforceRole(session: any, requiredRole: string) {
  if (!session?.user) {
    redirect("/login");
  }
  if ((session.user as any).role !== requiredRole) {
    redirect("/unauthorized");
  }
  return (session.user as any).id;
}

export async function getUserProfile() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true, isEmailVerified: true, createdAt: true },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function updateUserProfile(data: { name?: string; email?: string }) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;

  const parsed = UpdateProfileSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }
  
  const updateData: { name?: string; email?: string; isEmailVerified?: boolean } = {};
  if (parsed.data.name) updateData.name = parsed.data.name;
  
  const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  
  if (parsed.data.email && parsed.data.email !== currentUser?.email) {
    updateData.email = parsed.data.email;
    updateData.isEmailVerified = false; // Reset verification if email changes
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, email: true, name: true, role: true, isEmailVerified: true },
  });
}

// ─── BUYER DASHBOARD ──────────────────

export async function getBuyerDashboard() {
  const session = await auth();
  const buyerId = enforceRole(session, "BUYER");

  const user = await prisma.user.findUnique({
    where: { id: buyerId },
    select: { id: true, name: true },
  });

  const now = new Date();
  const next48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  // Priority 1: Upcoming booking within 48h
  const upcomingBooking = await prisma.booking.findFirst({
    where: {
      buyerId,
      surveyDate: {
        gte: now,
        lte: next48Hours,
      },
      status: "CONFIRMED",
    },
    orderBy: { surveyDate: "asc" },
    include: {
      property: {
        select: { title: true, id: true, slug: true },
      },
    },
  });

  // Priority 3: Recently viewed property
  const recentlyViewed = await prisma.propertyViewLog.findFirst({
    where: { viewerId: buyerId, property: { isDeleted: false } },
    orderBy: { viewedAt: "desc" },
    include: {
      property: {
        select: { title: true, id: true, slug: true },
      },
    },
  });

  return {
    profile: {
      name: user?.name ?? "Pengguna",
      email: "user@example.com",
      avatar: "/avatar-placeholder.png",
      phone: "-",
      address: "-",
    },
    heroState: {
      upcomingBooking: upcomingBooking
        ? {
            id: upcomingBooking.id,
            propertyTitle: upcomingBooking.property.title,
            surveyDate: upcomingBooking.surveyDate.toISOString(),
          }
        : null,
      recentlyViewed: recentlyViewed
        ? {
            propertyId: recentlyViewed.property.id,
            propertyTitle: recentlyViewed.property.title,
            propertySlug: recentlyViewed.property.slug,
          }
        : null,
    },
  };
}

export async function getBuyerBookings(page: number = 1, limit: number = 10) {
  const session = await auth();
  const buyerId = enforceRole(session, "BUYER");

  const skip = (page - 1) * limit;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: { buyerId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            address: true,
            price: true,
            media: {
              where: { isPrimary: true },
              take: 1,
              select: { s3Url: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.booking.count({ where: { buyerId } })
  ]);

  const data = bookings.map((b) => ({
    id: b.id,
    propertyId: b.propertyId,
    title: b.property.title,
    address: b.property.address,
    price: Number(b.property.price),
    imageUrl: b.property.media?.[0]?.s3Url || null,
    surveyDate: b.surveyDate.toISOString(),
    timeSlot: b.timeSlot,
    status: b.status,
    createdAt: b.createdAt.toISOString(),
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getBuyerFavorites(page: number = 1, limit: number = 12) {
  const session = await auth();
  const buyerId = enforceRole(session, "BUYER");

  const skip = (page - 1) * limit;
  const where = { buyerId, property: { isDeleted: false } };

  const [favorites, total] = await Promise.all([
    prisma.savedProperty.findMany({
      where,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            address: true,
            price: true,
            bedrooms: true,
            bathrooms: true,
            surfaceArea: true,
            propertyType: true,
            status: true,
            media: {
              where: { isPrimary: true },
              take: 1,
              select: { s3Url: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.savedProperty.count({ where })
  ]);

  const data = favorites.map((f) => ({
    id: f.id,
    propertyId: f.property.id,
    title: f.property.title,
    address: f.property.address,
    price: Number(f.property.price),
    bedrooms: f.property.bedrooms,
    bathrooms: f.property.bathrooms,
    surfaceArea: Number(f.property.surfaceArea),
    propertyType: f.property.propertyType,
    status: f.property.status,
    imageUrl: f.property.media?.[0]?.s3Url || null,
    addedAt: f.createdAt.toISOString(),
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

// ─── OWNER DASHBOARD ──────────────────

export async function getOwnerDashboard() {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const user = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { id: true, name: true, email: true },
  });

  const [totalProperties, activeListings, totalLeads, totalViews] = await Promise.all([
    prisma.property.count({ where: { ownerId, isDeleted: false } }),
    prisma.property.count({ where: { ownerId, status: "PUBLISHED", isDeleted: false } }),
    prisma.lead.count({ where: { property: { ownerId, isDeleted: false } } }),
    prisma.propertyViewLog.count({ where: { property: { ownerId, isDeleted: false } } }),
  ]);

  const recentBookings = await prisma.booking.findMany({
    where: { property: { ownerId, isDeleted: false } },
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, property: { select: { title: true } } },
  });

  return {
    profile: {
      name: user?.name ?? "Pemilik",
      email: user?.email ?? "",
    },
    stats: {
      totalProperties,
      activeListings,
      totalViews,
      inquiries: totalLeads,
    },
    totalProperties,
    totalLeads,
    totalViews,
    recentActivities: recentBookings.map((b) => ({
      id: b.id,
      title: `Booking untuk ${b.property.title}`,
      description: "Permintaan jadwal survei masuk",
      date: b.createdAt,
    })),
  };
}

export async function getOwnerProperties(statusFilter: string, typeFilter: string, page: number = 1, limit: number = 10) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const skip = (page - 1) * limit;
  const where = {
    ownerId,
    isDeleted: false,
    ...(statusFilter !== "ALL" && { status: statusFilter as any }),
    ...(typeFilter !== "ALL" && { propertyType: typeFilter }),
  };

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        media: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.property.count({ where })
  ]);

  const data = properties.map((p) => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    address: p.address,
    status: p.status,
    propertyType: p.propertyType,
    imageUrl: p.media?.[0]?.s3Url || null,
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getPropertyAnalytics(propertyId: string) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false },
    select: { id: true, title: true }
  });

  if (!property) throw new Error("Properti tidak ditemukan atau Anda tidak memiliki akses.");

  const [totalViews, totalBookings] = await Promise.all([
    prisma.propertyViewLog.count({ where: { propertyId } }),
    prisma.booking.count({ where: { propertyId } }),
  ]);

  const conversionRate = totalViews > 0 ? ((totalBookings / totalViews) * 100).toFixed(2) : "0.00";

  return {
    propertyTitle: property.title,
    totalViews,
    totalBookings,
    conversionRate: `${conversionRate}%`,
  };
}

export async function getPropertyLeads(propertyId: string, page: number = 1, limit: number = 10) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false },
    select: { id: true, title: true }
  });

  if (!property) throw new Error("Properti tidak ditemukan atau Anda tidak memiliki akses.");

  const skip = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: { propertyId },
      include: {
        buyer: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.lead.count({ where: { propertyId } })
  ]);

  const data = leads.map((l) => ({
    id: l.id,
    namaProspek: l.buyer.name || "Calon Pembeli",
    email: l.buyer.email,
    interaksi: l.interactionType,
    statusFollowUp: l.followUpStatus === "PENDING" ? "Belum Dihubungi" : l.followUpStatus === "CONTACTED" ? "Dalam Proses" : "Sudah Dihubungi",
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getOwnerPropertyStatuses(page: number = 1, limit: number = 10) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const skip = (page - 1) * limit;
  const where = { ownerId, isDeleted: false };

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        media: { where: { isPrimary: true }, take: 1 },
        _count: {
          select: { viewLogs: true, leads: true, bookings: true }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.property.count({ where })
  ]);

  const data = properties.map((p) => ({
    id: p.id,
    name: p.title,
    status: p.status === "PUBLISHED" ? "Aktif" : p.status === "PENDING_REVIEW" ? "Menunggu Review" : p.status,
    views: p._count.viewLogs,
    inquiries: p._count.leads + p._count.bookings,
    location: p.address,
    image: p.media[0]?.s3Url || "/property_1.jpg"
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getOwnerSchedules(page: number = 1, limit: number = 10) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const skip = (page - 1) * limit;
  const where = { property: { ownerId, isDeleted: false } };

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        buyer: { select: { name: true, email: true } },
        property: { select: { title: true } }
      },
      orderBy: { surveyDate: "asc" },
      skip,
      take: limit,
    }),
    prisma.booking.count({ where })
  ]);

  const data = bookings.map((b) => ({
    id: b.id,
    buyer: b.buyer.name || "Calon Pembeli",
    property: b.property.title,
    date: new Date(b.surveyDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    time: b.timeSlot,
    status: b.status === "PENDING" ? "Menunggu Konfirmasi" : b.status === "CONFIRMED" ? "Disetujui" : b.status
  }));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const parsed = UpdateBookingStatusSchema.safeParse({ status });
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, property: { ownerId } }
  });

  if (!booking) throw new Error("Booking tidak ditemukan atau unauthorized.");

  // Here we simulate sending an email notification implicitly
  // In a real scenario, we'd queue a background job: await sendEmailNotification(booking.buyerId, status);

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: parsed.data.status as any }
  });
}

export async function getOwnerDocuments() {
  const session = await auth();
  const userId = enforceRole(session, "OWNER");

  const docs = await prisma.document.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return docs.map((d) => ({
    id: d.id,
    name: d.title,
    status: "Terverifikasi",
    type: d.documentType
  }));
}

export async function deleteOwnerProperty(propertyId: string) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId }
  });

  if (!property) throw new Error("Unauthorized atau properti tidak ditemukan.");

  await prisma.$transaction([
    prisma.property.update({
      where: { id: propertyId },
      data: { isDeleted: true }
    }),
    prisma.booking.updateMany({
      where: { 
        propertyId: propertyId, 
        status: { in: ["PENDING", "CONFIRMED"] } 
      },
      data: { status: "CANCELLED" }
    })
  ]);

  return { success: true, message: "Properti berhasil dihapus dan jadwal terkait dibatalkan." };
}

export async function getPropertyForEdit(propertyId: string) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false }
  });

  if (!property) throw new Error("Unauthorized atau properti tidak ditemukan.");

  return {
    id: property.id,
    title: property.title,
    description: property.description,
    price: Number(property.price),
    propertyType: property.propertyType,
    address: property.address,
    latitude: property.latitude,
    longitude: property.longitude,
    status: property.status,
  };
}

export async function updateOwnerProperty(propertyId: string, formData: FormData) {
  const session = await auth();
  const ownerId = enforceRole(session, "OWNER");

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false }
  });

  if (!property) throw new Error("Unauthorized atau properti tidak ditemukan.");

  const payload = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    price: formData.get("price")?.toString(),
    propertyType: formData.get("propertyType")?.toString(),
    address: formData.get("address")?.toString(),
  };

  const parsed = UpdatePropertySchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { title, description, price, propertyType, address } = parsed.data;

  await prisma.property.update({
    where: { id: propertyId },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price }),
      ...(propertyType && { propertyType: propertyType.toUpperCase() as any }),
      ...(address && { address }),
    }
  });

  return { success: true, message: "Properti berhasil diperbarui." };
}
