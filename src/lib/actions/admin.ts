"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function verifyProperty(propertyId: string, status: string, notes?: string) {
  const session = await auth();

  if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized: Only ADMIN can verify properties.");
  }

  const userId = (session.user as any).id;
  if (!userId) {
    throw new Error("Unauthorized: User ID is missing from session.");
  }

  const updatedProperty = await prisma.property.update({
    where: { id: propertyId },
    data: { status },
  });

  if (notes) {
    await prisma.verificationAudit.create({
      data: {
        propertyId,
        surveyorId: userId,
        action: `Status changed to ${status}`,
        notes,
      },
    });
  }

  revalidatePath('/admin/verification');

  return updatedProperty;
}
