"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getAgentCommissions() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const agentId = (session.user as any).id;
  
  const commissions = await prisma.commission.findMany({
    where: { agentId },
    include: {
      booking: {
        include: {
          property: true,
          buyer: true,
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  
  return commissions.map((c) => ({
    id: c.id,
    property: c.booking.property.title,
    client: c.booking.buyer.name,
    price: Number(c.amount),
    commission: Number(c.amount) * (Number(c.percentage) / 100),
    status: c.status,
  }));
}
