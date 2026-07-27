import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";

const ALLOWED_FILE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
};

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { filename, fileType } = body;

    if (!filename || !fileType) {
      return NextResponse.json({ error: "Filename and fileType are required" }, { status: 400 });
    }

    if (!ALLOWED_FILE_TYPES[fileType]) {
      return NextResponse.json(
        { error: "Tipe file tidak didukung. Hanya JPEG, PNG, WEBP, GIF, dan PDF yang diperbolehkan." },
        { status: 400 }
      );
    }

    // Sanitasi filename dari path traversal dan karakter berbahaya
    const sanitizedFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "_");
    if (!sanitizedFilename || sanitizedFilename.startsWith(".")) {
      return NextResponse.json({ error: "Nama file tidak valid" }, { status: 400 });
    }

    const objectKey = `uploads/${session.user.id}/${Date.now()}-${sanitizedFilename}`;

    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: objectKey,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ url, key: objectKey });
  } catch (error) {
    console.error("Presigned URL generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
