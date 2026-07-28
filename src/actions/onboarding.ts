"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function completeOnboarding(role: Role) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        role: role,
        isOnboarded: true,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Onboarding error:", error);
    return { error: "Failed to complete onboarding" };
  }
}
