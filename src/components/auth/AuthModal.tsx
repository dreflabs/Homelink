"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function AuthModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-white border-slate-100 shadow-xl overflow-y-auto max-h-[90vh]">
        <VisuallyHidden>
          <DialogTitle>Authentication Modal</DialogTitle>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
