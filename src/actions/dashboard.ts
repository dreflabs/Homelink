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
    prisma.booking.count({ where: { buyerId } }),
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

  const [totalProperties, propertiesWithLogs] = await Promise.all([
    prisma.property.count({ where: { ownerId } }),
    prisma.property.findMany({
      where: { ownerId },
      select: { _count: { select: { viewLogs: true, leads: true } } },
    }),
  ]);

  const activeListings = await prisma.property.count({ where: { ownerId, status: "LIVE" } });
  const totalLeads = propertiesWithLogs.reduce((acc, p) => acc + p._count.leads, 0);
  const totalViews = propertiesWithLogs.reduce((acc, p) => acc + p._count.viewLogs, 0);

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
