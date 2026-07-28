"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ size = "md", variant = "dark", className }: LogoProps) {
  const imageDimensions = {
    sm: { width: 90, height: 26, className: "h-[26px] sm:h-7 w-auto object-contain" },
    md: { width: 110, height: 32, className: "h-7 sm:h-8 w-auto object-contain" },
    lg: { width: 140, height: 40, className: "h-9 sm:h-10 w-auto object-contain" },
  }[size];

  const isLightVariant = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md shrink-0",
        className
      )}
    >
      <Image
        src="/LOGO_UTAMA_HOMELINK.png"
        alt="HomeLink Logo"
        width={imageDimensions.width}
        height={imageDimensions.height}
        style={{ width: "auto", height: "auto" }}
        className={cn(
          imageDimensions.className,
          isLightVariant && "brightness-0 invert"
        )}
        priority
      />
    </Link>
  );
}

