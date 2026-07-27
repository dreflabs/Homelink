import prisma from "@/lib/prisma";

export async function processPaymentWebhook(eventId: string) {
  try {
    const event = await prisma.webhookEvent.findUnique({ where: { id: eventId } });
    if (!event || event.status !== "PENDING") return;

    const payload: any = event.payload;
    const { invoiceId, status, amountSettled } = payload;

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { subscription: true }
    });

    if (!invoice) {
      await prisma.webhookEvent.update({
        where: { id: eventId },
        data: { status: "FAILED", processedAt: new Date() }
      });
      return;
    }

    if (status === "PAID") {
      // Amount Reconciliation
      if (amountSettled && parseFloat(amountSettled) !== parseFloat(invoice.amount.toString())) {
        console.warn(`Amount mismatch for invoice ${invoiceId}: Expected ${invoice.amount}, got ${amountSettled}`);
        await prisma.webhookEvent.update({
          where: { id: eventId },
          data: { status: "FAILED", processedAt: new Date() }
        });
        return;
      }

      const txOps: any[] = [];
      txOps.push(prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: "PAID", paidAt: new Date() }
      }));

      if (invoice.subscriptionId) {
        // Calculate subscription dates
        const now = new Date();
        const durationMonths = invoice.subscription?.plan === 'YEARLY' ? 12 : 1;
        const newEndDate = new Date(now);
        newEndDate.setMonth(newEndDate.getMonth() + durationMonths);

        txOps.push(prisma.subscription.update({
          where: { id: invoice.subscriptionId },
          data: { 
            status: "ACTIVE",
            startDate: now,
            endDate: newEndDate
          }
        }));
      }
      
      await prisma.$transaction(txOps);
    } else if (status === "FAILED") {
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: "CANCELLED" }
      });

      // Release trapped coupons
      const usages = await prisma.couponUsage.findMany({ where: { invoiceId } });
      if (usages.length > 0) {
        const couponIds = usages.map(u => u.couponId);
        await prisma.$transaction([
          prisma.coupon.updateMany({
            where: { id: { in: couponIds } },
            data: { usedCount: { decrement: 1 } }
          }),
          prisma.couponUsage.deleteMany({
            where: { invoiceId }
          })
        ]);
      }
    }

    await prisma.webhookEvent.update({
      where: { id: eventId },
      data: { status: "PROCESSED", processedAt: new Date() }
    });
  } catch (error) {
    console.error(`Error processing webhook event ${eventId}:`, error);
    await prisma.webhookEvent.update({
      where: { id: eventId },
      data: { status: "FAILED", processedAt: new Date() }
    });
  }
}
