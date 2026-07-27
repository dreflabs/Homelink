"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCouponSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discount: z.number().positive("Discount must be positive"),
  type: z.string().min(1, "Type is required"),
  maxUses: z.number().int().nonnegative().optional(),
  validFrom: z.date().optional(),
  validUntil: z.date().optional()
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

export async function getCoupons() {
  await requireAdmin();
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return coupons.map(c => ({
    ...c,
    discount: Number(c.discount),
  }));
}

export async function createCoupon(data: {
  code: string;
  discount: number;
  type: string;
  maxUses?: number;
  validFrom?: Date;
  validUntil?: Date;
}) {
  await requireAdmin();
  const parsedData = createCouponSchema.parse(data);
  const coupon = await prisma.coupon.create({
    data: {
      code: parsedData.code.toUpperCase(),
      discount: parsedData.discount,
      type: parsedData.type,
      maxUses: parsedData.maxUses,
      validFrom: parsedData.validFrom,
      validUntil: parsedData.validUntil,
    },
  });
  revalidatePath("/coupons");
  return {
    ...coupon,
    discount: Number(coupon.discount),
  };
}

export async function deleteCoupon(id: string) {
  await requireAdmin();
  await prisma.coupon.delete({
    where: { id },
  });
  revalidatePath("/coupons");
}

