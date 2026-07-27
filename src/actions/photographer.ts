"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getPhotographerTasks() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const photographerId = (session.user as any).id;
  const userRole = (session.user as any).role;
  
  const tasks = await prisma.photographerTask.findMany({
    where: userRole === "PHOTOGRAPHER" ? { photographerId } : {},
    include: {
      property: true,
    },
    orderBy: { scheduledAt: 'asc' }
  });
  
  return tasks;
}

export async function getPhotographerDeliveries() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const photographerId = (session.user as any).id;
  const userRole = (session.user as any).role;
  
  const deliveries = await prisma.photographerDelivery.findMany({
    where: userRole === "PHOTOGRAPHER" ? { photographerId } : {},
    include: {
      property: true,
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return deliveries;
}

export async function getPhotographerDashboardStats() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const photographerId = (session.user as any).id;
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [scheduledThisWeek, deliveriesPending, deliveriesDoneThisMonth] = await Promise.all([
    prisma.photographerTask.count({
      where: { photographerId, scheduledAt: { gte: startOfWeek } },
    }),
    prisma.photographerDelivery.count({
      where: { photographerId, status: "PENDING" },
    }),
    prisma.photographerDelivery.count({
      where: { photographerId, status: "DELIVERED", createdAt: { gte: startOfMonth } },
    }),
  ]);

  return { scheduledThisWeek, deliveriesPending, deliveriesDoneThisMonth };
}

export async function getMediaLibrary() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userId = (session.user as any).id;
  const userRole = (session.user as any).role;
  
  const media = await prisma.media.findMany({
    where: userRole === "PHOTOGRAPHER" ? { uploadedById: userId } : {},
    orderBy: { createdAt: 'desc' }
  });
  
  return media;
}
