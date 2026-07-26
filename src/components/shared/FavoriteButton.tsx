"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

export function FavoriteButton({ initialLiked = false }: { initialLiked?: boolean }) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    // TODO: Add API call to actually toggle favorite status
  };

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-label={isLiked ? "Hapus dari Favorit" : "Tambah ke Favorit"}
      aria-pressed={isLiked}
      className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md transition-all shadow-sm active:scale-90"
    >
      <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
    </button>
  );
}
