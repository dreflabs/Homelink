"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getUserProfile() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as { id: string }).id;

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
  const userId = (session.user as { id: string }).id;

  const updateData: { name?: string; email?: string } = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, email: true, name: true, role: true },
  });
}

export async function getBuyerDashboard() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const buyerId = (session.user as { id: string }).id;

  const user = await prisma.user.findUnique({
    where: { id: buyerId },
    select: { id: true, name: true, email: true },
  });

  const [totalBookings, totalLeads, totalSavedSearches, totalSavedProperties] = await Promise.all([
    prisma.booking.count({ where: { buyerId, status: { notIn: ["CANCELLED", "REJECTED"] } } }),
    prisma.lead.count({ where: { buyerId } }),
    prisma.savedSearch.count({ where: { userId: buyerId } }),
    prisma.savedProperty.count({ where: { buyerId } }),
  ]);

  return {
    profile: {
      name: user?.name ?? "Pengguna",
      email: user?.email ?? "",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name ?? "U")}`,
      phone: "",
      address: "",
    },
    stats: {
      totalBookings,
      totalLeads,
      totalSavedSearches,
      totalSavedProperties,
    },
    recentActivities: [] as any[],
  };
}

export async function getOwnerDashboard() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const user = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { id: true, name: true, email: true },
  });

  const [totalProperties, activeListings, totalLeads, totalViews] = await Promise.all([
    prisma.property.count({ where: { ownerId } }),
    prisma.property.count({ where: { ownerId, status: "PUBLISHED" } }),
    prisma.lead.count({ where: { property: { ownerId } } }),
    prisma.propertyViewLog.count({ where: { property: { ownerId } } }),
  ]);

  const recentBookings = await prisma.booking.findMany({
    where: { property: { ownerId } },
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

export async function getOwnerProperties(statusFilter: string, typeFilter: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const properties = await prisma.property.findMany({
    where: {
      ownerId,
      isDeleted: false,
      ...(statusFilter !== "ALL" && { status: statusFilter as any }),
      ...(typeFilter !== "ALL" && { propertyType: typeFilter }),
    },
    include: {
      media: {
        where: { isPrimary: true },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return properties.map((p) => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    address: p.address,
    status: p.status,
    propertyType: p.propertyType,
    imageUrl: p.media?.[0]?.s3Url || null,
  }));
}

export async function getBuyerBookings() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const buyerId = (session.user as { id: string }).id;

  const bookings = await prisma.booking.findMany({
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
  });

  return bookings.map((b) => ({
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
}

export async function getBuyerFavorites() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const buyerId = (session.user as { id: string }).id;

  const favorites = await prisma.savedProperty.findMany({
    where: { buyerId },
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
  });

  return favorites.map((f) => ({
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
}

// ─── Owner Dashboard Real Actions & Ownership Verification ──────────────────

export async function getPropertyAnalytics(propertyId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  // Strict Ownership Check
  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false },
    select: { id: true, title: true }
  });

  if (!property) {
    throw new Error("Properti tidak ditemukan atau Anda tidak memiliki akses.");
  }

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

export async function getPropertyLeads(propertyId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  // Strict Ownership Check
  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false },
    select: { id: true, title: true }
  });

  if (!property) {
    throw new Error("Properti tidak ditemukan atau Anda tidak memiliki akses.");
  }

  const leads = await prisma.lead.findMany({
    where: { propertyId },
    include: {
      buyer: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return leads.map((l) => ({
    id: l.id,
    namaProspek: l.buyer.name || "Calon Pembeli",
    email: l.buyer.email,
    interaksi: l.interactionType,
    statusFollowUp: l.followUpStatus === "PENDING" ? "Belum Dihubungi" : l.followUpStatus === "CONTACTED" ? "Dalam Proses" : "Sudah Dihubungi",
  }));
}

export async function getOwnerPropertyStatuses() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const properties = await prisma.property.findMany({
    where: { ownerId, isDeleted: false },
    include: {
      media: { where: { isPrimary: true }, take: 1 },
      _count: {
        select: { viewLogs: true, leads: true, bookings: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return properties.map((p) => ({
    id: p.id,
    name: p.title,
    status: p.status === "PUBLISHED" ? "Aktif" : p.status === "PENDING_REVIEW" ? "Menunggu Review" : p.status,
    views: p._count.viewLogs,
    inquiries: p._count.leads + p._count.bookings,
    location: p.address,
    image: p.media[0]?.s3Url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80"
  }));
}

export async function getOwnerSchedules() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const bookings = await prisma.booking.findMany({
    where: { property: { ownerId } },
    include: {
      buyer: { select: { name: true, email: true } },
      property: { select: { title: true } }
    },
    orderBy: { surveyDate: "asc" }
  });

  return bookings.map((b) => ({
    id: b.id,
    buyer: b.buyer.name || "Calon Pembeli",
    property: b.property.title,
    date: new Date(b.surveyDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    time: b.timeSlot,
    status: b.status === "PENDING" ? "Menunggu Konfirmasi" : b.status === "CONFIRMED" ? "Disetujui" : b.status
  }));
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, property: { ownerId } }
  });

  if (!booking) throw new Error("Booking tidak ditemukan atau unauthorized.");

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status }
  });
}

export async function getOwnerDocuments() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as { id: string }).id;

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
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId }
  });

  if (!property) throw new Error("Unauthorized atau properti tidak ditemukan.");

  await prisma.property.update({
    where: { id: propertyId },
    data: { isDeleted: true }
  });

  return { success: true, message: "Properti berhasil dihapus." };
}

export async function getPropertyForEdit(propertyId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

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
  if (!session?.user) throw new Error("Unauthorized");
  const ownerId = (session.user as { id: string }).id;

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId, isDeleted: false }
  });

  if (!property) throw new Error("Unauthorized atau properti tidak ditemukan.");

  const title = formData.get("title")?.toString() || property.title;
  const description = formData.get("description")?.toString() || property.description;
  const price = formData.get("price")?.toString();
  const propertyType = formData.get("propertyType")?.toString() || property.propertyType;
  const address = formData.get("address")?.toString() || property.address;

  await prisma.property.update({
    where: { id: propertyId },
    data: {
      title,
      description,
      price: price ? parseFloat(price) : property.price,
      propertyType: propertyType.toUpperCase(),
      address,
    }
  });

  return { success: true, message: "Properti berhasil diperbarui." };
}

