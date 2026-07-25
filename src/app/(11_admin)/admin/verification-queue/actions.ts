"use server";

export async function approveProperty(propertyId: string) {
  console.log(`Approving property ${propertyId}`);
  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: `Property ${propertyId} approved successfully.` };
}

export async function rejectProperty(propertyId: string, reason: string) {
  console.log(`Rejecting property ${propertyId} for reason: ${reason}`);
  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: `Property ${propertyId} rejected.` };
}
