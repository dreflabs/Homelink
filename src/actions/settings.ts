"use server";

import { auth } from "@/lib/auth";

export async function updateNotificationPreferences(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const savedProperties = formData.get("savedProperties") === "true";
  const newMessages = formData.get("newMessages") === "true";
  const recommendations = formData.get("recommendations") === "true";

  // TODO: Save to database when UserPreferences model is created
  console.log("Saving preferences for", session.user.id, {
    savedProperties,
    newMessages,
    recommendations,
  });

  return { success: true };
}
