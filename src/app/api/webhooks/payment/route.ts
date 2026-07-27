import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { eventBus } from "@/lib/eventBus";

// Import the service dynamically or rely on a centralized listener registration elsewhere
// For simplicity in serverless, we attach it here. In a real long-running server, 
// this would be registered at app initialization.
import { processPaymentWebhook } from "@/services/webhook.service";
eventBus.on("process-payment-webhook", async (eventId: string) => {
  await processPaymentWebhook(eventId);
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");
    const secret = process.env.PAYMENT_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json({ error: "Webhook secret is not configured" }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const signatureBuffer = Buffer.from(signature, 'utf8');
    const expectedSignatureBuffer = Buffer.from(expectedSignature, 'utf8');

    if (signatureBuffer.length !== expectedSignatureBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const { invoiceId, status } = body;

    if (!invoiceId || !status) {
      return NextResponse.json({ error: "Invalid payload: invoiceId and status are required" }, { status: 400 });
    }

    const event = await prisma.webhookEvent.create({
      data: {
        eventType: "PAYMENT_WEBHOOK",
        payload: body,
        status: "PENDING"
      }
    });

    // Emit event to background worker (Fast Acknowledgment)
    eventBus.emit("process-payment-webhook", event.id);

    return NextResponse.json({ success: true, message: "Webhook accepted and queued" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
