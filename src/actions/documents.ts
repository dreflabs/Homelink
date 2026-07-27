"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function getBuyerDocuments() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return documents;
}

export async function uploadDocument(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;

    if (!file || file.size === 0) {
      throw new Error("File tidak ditemukan");
    }
    
    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Ukuran file maksimal 5MB");
    }

    const ext = path.extname(file.name).toLowerCase() || ".pdf";
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
    if (!allowedExtensions.includes(ext)) {
      throw new Error("Format file tidak diizinkan. Hanya PDF dan gambar (JPG, PNG, WEBP).");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${session.user.id}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "documents");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    
    const fileUrl = `/uploads/documents/${filename}`;

    const doc = await prisma.document.create({
      data: {
        title: title || file.name,
        documentType: type || "Lainnya",
        fileUrl,
        userId: session.user.id,
      },
    });

    revalidatePath("/documents");
    revalidatePath("/dashboard");

    return { success: true, document: doc };
  } catch (error: any) {
    console.error("Upload document error:", error);
    return { success: false, error: "Gagal mengunggah dokumen. Silakan coba lagi." };
  }
}
