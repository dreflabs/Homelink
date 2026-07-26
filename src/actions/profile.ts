"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };

    const parsed = updateProfileSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message || "Input tidak valid");
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    });

    revalidatePath("/my-profile");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { success: false, error: error.message || "Gagal memperbarui profil" };
  }
}

export async function uploadProfileImage(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const file = formData.get("avatar") as File;
    if (!file || file.size === 0) {
      throw new Error("File tidak ditemukan");
    }
    
    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Ukuran file maksimal 2MB");
    }
    
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Hanya file JPG, PNG, dan WEBP yang didukung");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${session.user.id}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    
    const imageUrl = `/uploads/avatars/${filename}`;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    revalidatePath("/my-profile");
    revalidatePath("/dashboard");

    return { success: true, url: imageUrl };
  } catch (error: any) {
    console.error("Upload avatar error:", error);
    return { success: false, error: error.message || "Gagal mengunggah foto" };
  }
}
