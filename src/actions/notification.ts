"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createNotificationSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  type: z.string().min(1),
  relatedId: z.string().optional()
});

const templateSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  bodyHtml: z.string().min(1),
  channel: z.string().min(1)
});

// ─── Role Guard ───────────────────────────────────────────────────────────────

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const role = (session.user as any).role as string;
  if (!(ADMIN_ROLES as readonly string[]).includes(role)) {
    throw new Error("Forbidden: Admin access required");
  }
  return session.user as { id: string; role: string };
}

export async function getNotificationHistory() {
  try {
    await requireAdmin();
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
    return notifications;
  } catch (error) {
    console.error("Failed to fetch notification history:", error);
    return [];
  }
}

export async function createNotification(
  userId: string,
  title: string,
  body: string,
  type: string,
  relatedId?: string
) {
  try {
    await requireAdmin();
    const parsedData = createNotificationSchema.parse({ userId, title, body, type, relatedId });
    await prisma.notification.create({
      data: {
        userId: parsedData.userId,
        title: parsedData.title,
        body: parsedData.body,
        type: parsedData.type,
        relatedId: parsedData.relatedId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create notification:", error);
    return { success: false, error: "Failed to create notification" };
  }
}

export async function getNotificationTemplates() {
  try {
    await requireAdmin();
    const templates = await prisma.notificationTemplate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return templates;
  } catch (error) {
    console.error("Failed to fetch notification templates:", error);
    return [];
  }
}

export async function createNotificationTemplate(data: {
  name: string;
  subject: string;
  bodyHtml: string;
  channel: string;
}) {
  try {
    await requireAdmin();
    const parsedData = templateSchema.parse(data);
    await prisma.notificationTemplate.create({
      data: parsedData,
    });
    revalidatePath("/templates");
    return { success: true };
  } catch (error) {
    console.error("Failed to create template:", error);
    return { success: false, error: "Failed to create template" };
  }
}

export async function updateNotificationTemplate(
  id: string,
  data: {
    name: string;
    subject: string;
    bodyHtml: string;
    channel: string;
  }
) {
  try {
    await requireAdmin();
    const parsedData = templateSchema.parse(data);
    await prisma.notificationTemplate.update({
      where: { id },
      data: parsedData,
    });
    revalidatePath("/templates");
    return { success: true };
  } catch (error) {
    console.error("Failed to update template:", error);
    return { success: false, error: "Failed to update template" };
  }
}

export async function deleteNotificationTemplate(id: string) {
  try {
    await requireAdmin();
    await prisma.notificationTemplate.delete({
      where: { id },
    });
    revalidatePath("/templates");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete template:", error);
    return { success: false, error: "Failed to delete template" };
  }
}

