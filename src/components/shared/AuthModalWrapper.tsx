"use client";

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from 'react';

export function AuthModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg w-full p-0 overflow-hidden bg-white border border-slate-100 shadow-[0_24px_64px_rgb(0,0,0,0.24)] rounded-3xl max-h-[90vh] overflow-y-auto z-50">
        <VisuallyHidden>
          <DialogTitle>Autentikasi HomeLink</DialogTitle>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
