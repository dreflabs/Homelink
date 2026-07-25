"use server";

export async function generatePaymentLink(planId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Return a mock checkout URL
  const mockSessionId = Math.random().toString(36).substring(2, 10);
  return `https://checkout.stripe.com/mock/pay/${planId}?session=${mockSessionId}`;
}
