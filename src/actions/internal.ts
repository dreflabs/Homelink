'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ticketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']);
const ownerVerificationStatusSchema = z.enum(['UNVERIFIED', 'APPROVED', 'REJECTED']);
const taskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'OVERDUE']);

// ─── Role Guard ───────────────────────────────────────────────────────────────

const ALLOWED_INTERNAL_ROLES = ["INTERNAL_AGENT", "ADMIN", "SUPER_ADMIN"] as const;

async function requireInternalAccess() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const role = (session.user as any).role as string;
  if (!(ALLOWED_INTERNAL_ROLES as readonly string[]).includes(role)) {
    throw new Error("Forbidden: Internal access required");
  }
  return session.user as { id: string; role: string };
}

// Commission Actions
export async function getCommissions() {
  try {
    await requireInternalAccess();
    const commissions = await prisma.commission.findMany({
      include: {
        agent: true,
        booking: {
          include: {
            property: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return commissions;
  } catch (error) {
    console.error('Failed to fetch commissions:', error);
    return [];
  }
}

// Ticket Actions
export async function getTickets() {
  try {
    await requireInternalAccess();
    const tickets = await prisma.ticket.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tickets;
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    return [];
  }
}

export async function updateTicketStatus(id: string, status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED') {
  try {
    await requireInternalAccess();
    const parsedStatus = ticketStatusSchema.parse(status);
    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status: parsedStatus },
    });
    revalidatePath('/internal/customer-support');
    return ticket;
  } catch (error) {
    console.error('Failed to update ticket status:', error);
    throw error;
  }
}

// Owner Verification Actions
export async function getOwnerVerifications() {
  try {
    await requireInternalAccess();
    const verifications = await prisma.ownerVerification.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return verifications;
  } catch (error) {
    console.error('Failed to fetch owner verifications:', error);
    return [];
  }
}

export async function updateOwnerVerificationStatus(id: string, status: 'UNVERIFIED' | 'APPROVED' | 'REJECTED') {
  try {
    await requireInternalAccess();
    const parsedStatus = ownerVerificationStatusSchema.parse(status);
    const verification = await prisma.ownerVerification.update({
      where: { id },
      data: { status: parsedStatus },
    });
    revalidatePath('/internal/owner-verification');
    return verification;
  } catch (error: any) {
    console.error('Failed to update owner verification status:', error);
    if (error?.code === 'P2002') {
      throw new Error("Verifikasi gagal diproses. Silakan periksa kembali data Anda.");
    }
    throw error;
  }
}

export async function submitOwnerVerification(data: { userId: string; idType: string; idNumber: string; documentUrl?: string }) {
  try {
    await requireInternalAccess();
    const verification = await prisma.ownerVerification.upsert({
      where: { userId: data.userId },
      create: {
        userId: data.userId,
        idType: data.idType,
        idNumber: data.idNumber,
        documentUrl: data.documentUrl,
        status: 'UNVERIFIED',
      },
      update: {
        idType: data.idType,
        idNumber: data.idNumber,
        documentUrl: data.documentUrl,
        status: 'UNVERIFIED',
      },
    });
    revalidatePath('/internal/owner-verification');
    return { success: true, verification };
  } catch (error: any) {
    console.error('Failed to submit owner verification:', error);
    if (error?.code === 'P2002') {
      return { success: false, error: "Verifikasi gagal diproses. Silakan periksa kembali data Anda." };
    }
    return { success: false, error: "Gagal memproses verifikasi pemilik." };
  }
}

// Task Actions
export async function getTasks() {
  try {
    await requireInternalAccess();
    const tasks = await prisma.task.findMany({
      include: {
        assignee: true,
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
    return tasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
}

export async function updateTaskStatus(id: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'OVERDUE') {
  try {
    await requireInternalAccess();
    const parsedStatus = taskStatusSchema.parse(status);
    const task = await prisma.task.update({
      where: { id },
      data: { status: parsedStatus },
    });
    revalidatePath('/internal/tasks');
    return task;
  } catch (error) {
    console.error('Failed to update task status:', error);
    throw error;
  }
}

// Analytics Actions
export async function getInternalAnalyticsStats() {
  await requireInternalAccess();
  const [totalUsers, totalListings, totalLeads, closedLeads, paidInvoices] = await Promise.all([
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.property.count({ where: { isDeleted: false } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { followUpStatus: 'CLOSED' } }),
    prisma.invoice.findMany({ where: { status: 'PAID' }, select: { amount: true } }),
  ]);

  const totalRevenue = paidInvoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const conversionRate = totalLeads > 0 ? Number(((closedLeads / totalLeads) * 100).toFixed(1)) : 0;

  return { totalUsers, totalListings, conversionRate, totalRevenue };
}

// Upcoming schedule, derived from Task due dates (org-wide, not just the current user)
export async function getUpcomingTasks(limit: number = 10) {
  try {
    await requireInternalAccess();
    const tasks = await prisma.task.findMany({
      where: {
        dueDate: { gte: new Date() },
        status: { not: 'DONE' },
      },
      include: { assignee: { select: { name: true } } },
      orderBy: { dueDate: 'asc' },
      take: limit,
    });
    return tasks;
  } catch (error) {
    console.error('Failed to fetch upcoming tasks:', error);
    return [];
  }
}

