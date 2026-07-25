import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceId, status } = body;

    if (!invoiceId || !status) {
      return NextResponse.json({ error: "Invalid payload: invoiceId and status are required" }, { status: 400 });
    }

    if (status === "PAID") {
      const invoice = await prisma.invoice.update({
        where: { id: invoiceId },
        data: { 
          status: "PAID",
          paidAt: new Date()
        },
        include: { subscription: true }
      });

      if (invoice.subscriptionId) {
        await prisma.subscription.update({
          where: { id: invoice.subscriptionId },
          data: { status: "ACTIVE" }
        });
      }
    } else if (status === "FAILED") {
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: "CANCELLED" }
      });
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
