import prisma from "@/lib/prisma";

export async function verifyOwnership(resourceType: string, resourceId: string, userId: string): Promise<boolean> {
  try {
    switch (resourceType) {
      case "property": {
        const property = await prisma.property.findUnique({
          where: { id: resourceId },
          select: { ownerId: true },
        });
        return property?.ownerId === userId;
      }
      case "user": {
        return resourceId === userId;
      }
      // Add other resource types as needed (e.g. "booking", "review")
      default:
        return false;
    }
  } catch (error) {
    console.error(`Error verifying ownership for ${resourceType} ${resourceId}:`, error);
    return false;
  }
}
