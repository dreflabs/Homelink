import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import PropertyVerificationClient from "./PropertyVerificationClient";

export const dynamic = 'force-dynamic';

export default async function PropertyVerificationPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch pending and drafted properties
  const properties = await prisma.property.findMany({
    where: {
      status: {
        in: ['PENDING_REVIEW', 'DRAFT']
      }
    },
    include: {
      owner: true,
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // Map to the format expected by the client
  const queue = properties.map(p => ({
    id: p.id,
    title: p.title,
    address: p.address,
    owner: p.owner?.name || "Unknown",
    status: p.status,
    submittedAt: new Date(p.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit", month: "short", year: "numeric"
    }),
    surveyor: undefined,
  }));

  return <PropertyVerificationClient initialQueue={queue} />;
}
