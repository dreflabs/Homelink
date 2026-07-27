"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
  withText?: boolean;
}

export function Logo({ size = "md", variant = "dark", className, withText = true }: LogoProps) {
  // Size mappings
  const containerSize = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-2xl",
  }[size];

  const iconSize = {
    sm: "w-4 h-4 rounded-sm",
    md: "w-5 h-5 rounded-md",
    lg: "w-6 h-6 rounded-[0.4rem]",
  }[size];

  const textSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  // Variant mappings
  const isDark = variant === "dark";
  
  const containerColors = isDark 
    ? "bg-slate-900 shadow-md shadow-slate-900/10" 
    : "bg-white shadow-lg shadow-black/5";
    
  const iconColors = isDark 
    ? "bg-white" 
    : "bg-primary";

  const textColors = isDark
    ? "text-slate-900"
    : "text-white";

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md", className)}>
      <div className={cn("flex items-center justify-center shrink-0", containerSize, containerColors)}>
        <div className={cn(iconSize, iconColors)} />
      </div>
      {withText && (
        <span className={cn("font-bold tracking-tight", textSize, textColors)}>
          HomeLink
        </span>
      )}
    </Link>
  );
}
