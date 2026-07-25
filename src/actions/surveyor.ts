"use server";

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const prisma = new PrismaClient();

const s3 = new S3Client({
  region: process.env.R2_REGION || "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  }
});

export async function submitSurveyReport(taskId: string, notes: string, documentsUrl: string[]) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "SURVEYOR" && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Surveyor role required");
  }

  const surveyorId = (session.user as any).id;

  const task = await prisma.surveyTask.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const report = await prisma.surveyReport.create({
    data: {
      surveyTaskId: taskId,
      notes,
      documentsUrl,
    }
  });

  await prisma.surveyTask.update({
    where: { id: taskId },
    data: { status: "COMPLETED" }
  });

  await prisma.property.update({
    where: { id: task.propertyId },
    data: { status: "SURVEYED" }
  });

  return report;
}

export async function getPresignedUrl(fileName: string, contentType: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  const userRole = (session.user as any).role;
  if (userRole !== "SURVEYOR" && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Surveyor role required");
  }

  // If R2 endpoint is missing, return a mock URL
  if (!process.env.R2_ENDPOINT) {
    return {
      uploadUrl: `https://mock-s3-bucket.s3.amazonaws.com/${fileName}?presigned=true`,
      fileUrl: `https://mock-s3-bucket.s3.amazonaws.com/${fileName}`
    };
  }

  const bucket = process.env.R2_BUCKET_NAME || 'bucket';

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  // R2 endpoint structure: https://<account_id>.r2.cloudflarestorage.com/<bucket_name>
  // Or public url if configured. We'll return a basic structure.
  
  const publicEndpoint = process.env.R2_PUBLIC_URL;
  const fileUrl = publicEndpoint ? `${publicEndpoint}/${fileName}` : `${process.env.R2_ENDPOINT}/${bucket}/${fileName}`;

  return { uploadUrl, fileUrl };
}
