"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function getAuthUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const role = (session.user as any).role as string;
  if (role !== "ADMIN" && role !== "SUPER_ADMIN" && role !== "OWNER") {
    throw new Error("Forbidden: Access denied");
  }
  return {
    id: session.user.id,
    role,
  };
}

export async function getInvoices() {
  try {
    const user = await getAuthUser();
    const where = (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
      ? {}
      : { userId: user.id };

    const invoices = await prisma.invoice.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
    return invoices;
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return [];
  }
}

export async function markInvoiceAsPaid(id: string) {
  try {
    const user = await getAuthUser();

    if (user.role === "OWNER") {
      const invoice = await prisma.invoice.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!invoice || invoice.userId !== user.id) {
        return { success: false, error: "Forbidden: You do not own this invoice" };
      }
    }

    await prisma.invoice.update({
      where: { id },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });
    revalidatePath("/invoices");
    return { success: true };
  } catch (error) {
    console.error("Failed to update invoice status:", error);
    return { success: false, error: "Failed to update invoice status" };
  }
}

export async function getSubscriptions() {
  try {
    const user = await getAuthUser();
    const where = (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
      ? {}
      : { userId: user.id };

    const subscriptions = await prisma.subscription.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
    return subscriptions;
  } catch (error) {
    console.error("Failed to fetch subscriptions:", error);
    return [];
  }
}

