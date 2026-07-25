"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function verifyProperty(id: string, status: 'APPROVED' | 'REJECTED') {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Admin role required");
  }

  const property = await prisma.property.update({
    where: { id },
    data: { status: status === 'APPROVED' ? 'PUBLISHED' : 'REJECTED' }
  });

  return property;
}

export async function getVerificationQueue() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Admin role required");
  }

  const queue = await prisma.property.findMany({
    where: {
      status: 'PENDING_REVIEW'
    },
    include: {
      owner: {
        select: { name: true, email: true }
      },
      surveyTasks: {
        include: {
          report: true,
          surveyor: { select: { name: true } }
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return queue;
}

export async function approveProperty(id: string) {
  return verifyProperty(id, 'APPROVED');
}

export async function rejectProperty(id: string) {
  return verifyProperty(id, 'REJECTED');
}

export async function getAllProperties() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Admin role required");
  }

  const properties = await prisma.property.findMany({
    include: {
      owner: {
        select: { name: true, email: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return properties;
}
