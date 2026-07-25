"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getNotificationHistory() {
  try {
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
    await prisma.notification.create({
      data: {
        userId,
        title,
        body,
        type,
        relatedId,
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
    await prisma.notificationTemplate.create({
      data,
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
    await prisma.notificationTemplate.update({
      where: { id },
      data,
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
