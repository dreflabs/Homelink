import * as React from "react";
import { Inbox } from "lucide-react";

interface TableEmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
}

export function TableEmptyState({
  title,
  description,
  icon,
  actionButton,
}: TableEmptyStateProps) {
  return (
    <div className="border border-dashed border-border/60 rounded-xl p-10 my-4 text-center bg-muted/20 flex flex-col items-center justify-center">
      <div className="mb-3 text-muted-foreground/80">
        {icon || <Inbox className="h-10 w-10 stroke-[1.5]" />}
      </div>
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-sm">
        {description}
      </p>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
}
