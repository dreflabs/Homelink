"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getCoupons() {
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
  const coupon = await prisma.coupon.create({
    data: {
      code: data.code.toUpperCase(),
      discount: data.discount,
      type: data.type,
      maxUses: data.maxUses,
      validFrom: data.validFrom,
      validUntil: data.validUntil,
    },
  });
  revalidatePath("/coupons");
  return {
    ...coupon,
    discount: Number(coupon.discount),
  };
}

export async function deleteCoupon(id: string) {
  await prisma.coupon.delete({
    where: { id },
  });
  revalidatePath("/coupons");
}
