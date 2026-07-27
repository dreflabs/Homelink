"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function verifyProperty(id: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN" && userRole !== "INTERNAL_AGENT") {
    throw new Error("Forbidden: Admin or Internal Agent role required");
  }

  const property = await prisma.property.update({
    where: { id },
    data: { status: status === 'APPROVED' ? 'PUBLISHED' : 'REJECTED' }
  });

  if (notes) {
    await prisma.verificationAudit.create({
      data: {
        propertyId: id,
        surveyorId: (session.user as any).id,
        action: `Status changed to ${status}`,
        notes,
      },
    });
  }

  return property;
}

export async function getVerificationQueue() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN" && userRole !== "INTERNAL_AGENT") {
    throw new Error("Forbidden: Admin or Internal Agent role required");
  }

  const queue = await prisma.property.findMany({
    where: {
      status: 'PENDING_REVIEW',
      isDeleted: false,
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
  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN" && userRole !== "INTERNAL_AGENT") {
    throw new Error("Forbidden: Admin or Internal Agent role required");
  }

  const properties = await prisma.property.findMany({
    where: {
      isDeleted: false,
    },
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
