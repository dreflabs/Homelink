import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columnCount?: number;
  columns?: number;
  rowCount?: number;
  rows?: number;
  className?: string;
}

export function TableSkeleton({
  columnCount,
  columns = 5,
  rowCount,
  rows = 5,
  className,
}: TableSkeletonProps) {
  const actualCols = columnCount ?? columns;
  const actualRows = rowCount ?? rows;
  const colArray = Array.from({ length: actualCols });
  const rowArray = Array.from({ length: actualRows });

  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border/60 ${className || ""}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {colArray.map((_, colIndex) => (
              <TableHead key={colIndex}>
                <Skeleton className="h-4 w-24 rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowArray.map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {colArray.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-6 w-full rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
