"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Default commission percentage applied when calculating commissions */
const DEFAULT_COMMISSION_PERCENTAGE = new Prisma.Decimal(5); // 5%

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

const UpdateLeadStatusSchema = z.object({
  leadId: z.string().uuid("Invalid lead ID"),
  status: z.enum(["PENDING", "CONTACTED", "CLOSED"], {
    message: "Status must be PENDING, CONTACTED, or CLOSED",
  }),
});

const CalculateCommissionSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
});

// ─── Role Guard Helpers ───────────────────────────────────────────────────────

const AGENT_ROLES = ["PARTNER_AGENT", "INTERNAL_AGENT", "ADMIN", "SUPER_ADMIN"] as const;
const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

function isAgentRole(role: string): boolean {
  return (AGENT_ROLES as readonly string[]).includes(role);
}

function isAdminRole(role: string): boolean {
  return (ADMIN_ROLES as readonly string[]).includes(role);
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Fetch leads assigned to a specific agent.
 * - Agents (PARTNER_AGENT / INTERNAL_AGENT) can only see their own leads.
 * - Admins can query any agentId or all leads if agentId is omitted.
 */
export async function getAgentLeads(agentId?: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const currentUser = session.user as { id: string; role: string };

  if (!isAgentRole(currentUser.role)) {
    throw new Error("Forbidden: Agent role required");
  }

  // Non-admin agents can only query their own leads
  const resolvedAgentId =
    isAdminRole(currentUser.role) && agentId ? agentId : currentUser.id;

  const leads = await prisma.lead.findMany({
    where: {
      buyerId: resolvedAgentId,
    },
    include: {
      property: {
        select: {
          id: true,
          title: true,
          address: true,
          price: true,
          status: true,
        },
      },
      buyer: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return leads;
}

/**
 * Update the followUpStatus of a Lead.
 * Only agent roles and above are allowed.
 */
export async function updateLeadStatus(
  leadId: string,
  status: "PENDING" | "CONTACTED" | "CLOSED"
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const currentUser = session.user as { id: string; role: string };

  if (!isAgentRole(currentUser.role)) {
    throw new Error("Forbidden: Agent role required");
  }

  const parsed = UpdateLeadStatusSchema.safeParse({ leadId, status });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  // Non-admins may only update leads that they own
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");

  if (!isAdminRole(currentUser.role) && lead.buyerId !== currentUser.id) {
    throw new Error("Forbidden: You can only update your own leads");
  }

  const updated = await prisma.lead.update({
    where: { id: leadId },
    data: { followUpStatus: status },
  });

  return updated;
}

/**
 * Calculate (create or update) the Commission record for a Booking.
 * Uses the default commission percentage if no custom percentage exists.
 * Only agents and admins may trigger this.
 */
export async function calculateCommission(bookingId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const currentUser = session.user as { id: string; role: string };

  if (!isAgentRole(currentUser.role)) {
    throw new Error("Forbidden: Agent role required");
  }

  const parsed = CalculateCommissionSchema.safeParse({ bookingId });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      property: { select: { price: true } },
    },
  });

  if (!booking) throw new Error("Booking not found");

  const propertyPrice = new Prisma.Decimal(booking.property.price);
  const percentage = DEFAULT_COMMISSION_PERCENTAGE;
  const commissionAmount = propertyPrice.mul(percentage).div(100);

  // Check for an existing commission record for this booking/agent pair
  const existing = await prisma.commission.findFirst({
    where: { bookingId, agentId: currentUser.id },
  });

  if (existing) {
    const commission = await prisma.commission.update({
      where: { id: existing.id },
      data: {
        percentage,
        amount: commissionAmount,
        status: "PENDING",
      },
    });
    return commission;
  }

  const commission = await prisma.commission.create({
    data: {
      bookingId,
      agentId: currentUser.id,
      percentage,
      amount: commissionAmount,
      status: "PENDING",
    },
  });

  return commission;
}

function requireAgent(session: any) {
  if (!session?.user) throw new Error("Unauthorized");
  const currentUser = session.user as { id: string; role: string };
  if (!isAgentRole(currentUser.role)) {
    throw new Error("Forbidden: Agent role required");
  }
  return currentUser;
}

/**
 * Properties this agent is actively working, derived from their lead pipeline
 * (the set of properties they have leads on).
 */
export async function getAgentProperties() {
  const session = await auth();
  const currentUser = requireAgent(session);

  const leads = await prisma.lead.findMany({
    where: {
      buyerId: currentUser.id,
      property: { isDeleted: false },
    },
    select: {
      property: {
        select: {
          id: true,
          title: true,
          address: true,
          price: true,
          status: true,
          propertyType: true,
          bedrooms: true,
          bathrooms: true,
          buildingArea: true,
        },
      },
    },
    distinct: ["propertyId"],
  });

  return leads.map((l) => l.property);
}

/**
 * This agent's lead/prospect pipeline. Note: the Lead model does not track a
 * separate client identity from the agent, so each entry represents one
 * property inquiry/follow-up rather than a distinct named client.
 */
export async function getAgentClients() {
  const session = await auth();
  const currentUser = requireAgent(session);

  const leads = await prisma.lead.findMany({
    where: { buyerId: currentUser.id },
    include: {
      property: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return leads.map((lead) => ({
    id: lead.id,
    property: lead.property.title,
    status: lead.followUpStatus,
    lastContact: lead.createdAt,
  }));
}

/**
 * Tasks assigned to this agent.
 */
export async function getAgentTasks() {
  const session = await auth();
  const currentUser = requireAgent(session);

  return prisma.task.findMany({
    where: { assigneeId: currentUser.id },
    orderBy: { dueDate: "asc" },
  });
}

/**
 * Upcoming calendar events for this agent, derived from their task due dates.
 */
export async function getAgentCalendarEvents() {
  const tasks = await getAgentTasks();
  return tasks.filter((t) => t.dueDate);
}

/**
 * Documents uploaded by this agent.
 */
export async function getAgentDocuments() {
  const session = await auth();
  const currentUser = requireAgent(session);

  return prisma.document.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Aggregate performance stats for this agent, computed from real leads/commissions/tasks.
 */
export async function getAgentReportStats() {
  const session = await auth();
  const currentUser = requireAgent(session);

  const [totalLeads, closedLeads, commissions, tasks] = await Promise.all([
    prisma.lead.count({ where: { buyerId: currentUser.id } }),
    prisma.lead.count({ where: { buyerId: currentUser.id, followUpStatus: "CLOSED" } }),
    prisma.commission.findMany({ where: { agentId: currentUser.id } }),
    prisma.task.findMany({ where: { assigneeId: currentUser.id } }),
  ]);

  const totalCommission = commissions.reduce((sum, c) => sum + Number(c.amount), 0);
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;
  const conversionRate = totalLeads > 0 ? Number(((closedLeads / totalLeads) * 100).toFixed(2)) : 0;

  return {
    totalLeads,
    closedLeads,
    totalCommission,
    taskCompletionRate,
    conversionRate,
  };
}
