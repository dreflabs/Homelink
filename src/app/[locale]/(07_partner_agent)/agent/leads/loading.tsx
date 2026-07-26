import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-8 p-4">
      <div>
        <div className="h-8 w-48 bg-slate-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-96 bg-slate-100 rounded-md animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-5 h-24 rounded-2xl border-slate-100 animate-pulse bg-slate-50"></Card>
        ))}
      </div>
      <TableSkeleton rows={5} columns={6} />
    </div>
  );
}
