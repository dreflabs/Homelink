'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Commission Actions
export async function getCommissions() {
  try {
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
    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status },
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
    const verification = await prisma.ownerVerification.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/internal/owner-verification');
    return verification;
  } catch (error) {
    console.error('Failed to update owner verification status:', error);
    throw error;
  }
}

// Task Actions
export async function getTasks() {
  try {
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
    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/internal/tasks');
    return task;
  } catch (error) {
    console.error('Failed to update task status:', error);
    throw error;
  }
}
