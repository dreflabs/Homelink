import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const auditLogs = await prisma.auditLog.findMany({
      include: { actor: true },
    });

    return NextResponse.json({ data: auditLogs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
