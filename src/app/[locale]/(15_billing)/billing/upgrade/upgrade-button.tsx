"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generatePaymentLink } from "@/actions/payment";
import { Loader2 } from "lucide-react";

export function UpgradeButton({ planId, planName }: { planId: string, planName: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const url = await generatePaymentLink(planId);
      window.location.href = url;
    } catch (error) {
      console.error("Failed to generate payment link", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="w-full" 
      onClick={handleUpgrade} 
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Upgrade to ${planName}`
      )}
    </Button>
  );
}
