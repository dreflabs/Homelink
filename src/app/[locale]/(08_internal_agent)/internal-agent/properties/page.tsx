import React from 'react'
import prisma from "@/lib/prisma";
import { PropertiesClient } from "./PropertiesClient";

export const dynamic = 'force-dynamic';

export default async function PropertyReviewPage() {
  const properties = await prisma.property.findMany({
    where: {
      status: "PENDING_REVIEW"
    },
    include: {
      owner: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  // To serialize decimal properly, we might need to convert it, but NextJS App router Handles it natively or warns, let's cast Decimal to number if needed or let Next handle it.
  // Actually Next.js complains about Decimal being passed from Server to Client component.
  // It's safer to map and convert price to string or number.
  
  const serializedProperties = properties.map(p => ({
    ...p,
    price: p.price.toNumber()
  }));

  return <PropertiesClient initialProperties={serializedProperties as any} />
}
