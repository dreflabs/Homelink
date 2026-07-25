"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getInvoices() {
  try {
    const invoices = await prisma.invoice.findMany({
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
    const subscriptions = await prisma.subscription.findMany({
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
