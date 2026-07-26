import { cn } from "@/lib/utils";
import { LucideIcon, Inbox } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center min-h-[300px] w-full rounded-2xl border border-dashed border-gray-200 bg-gray-50/50",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4">
        <Icon className="h-8 w-8 text-gray-400"  />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
