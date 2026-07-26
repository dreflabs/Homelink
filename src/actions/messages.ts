"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getConversations() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // For a simple chat, we get all users who we have sent/received messages from
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    },
    include: {
      sender: { select: { id: true, name: true, image: true } },
      receiver: { select: { id: true, name: true, image: true } }
    },
    orderBy: { createdAt: 'asc' }
  });

  return messages;
}

export async function sendMessage(receiverId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!content.trim()) {
    return { success: false, error: "Pesan tidak boleh kosong" };
  }

  try {
    const msg = await prisma.message.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content
      },
      include: {
        sender: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } }
      }
    });

    return { success: true, message: msg };
  } catch (error: any) {
    console.error("Failed to send message:", error);
    return { success: false, error: "Gagal mengirim pesan" };
  }
}
