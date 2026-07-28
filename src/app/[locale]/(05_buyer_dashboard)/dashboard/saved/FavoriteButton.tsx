"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
// import { removeFavorite } from "@/actions/dashboard"; // TODO: Implement this

export function FavoriteButton({ propertyId }: { propertyId: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    if (isSaving) return;
    setIsSaving(true);
    // TODO: Call server action to remove favorite and trigger router.refresh()
    // await removeFavorite(propertyId);
    console.log("Remove favorite:", propertyId);
    setIsSaving(false);
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-rose-500 shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50",
        isHovered && "bg-rose-50 text-rose-600"
      )}
      aria-label="Remove from favorites"
      disabled={isSaving}
    >
      <Heart className={cn("w-5 h-5", isHovered ? "fill-current" : "fill-current")} />
    </button>
  );
}
