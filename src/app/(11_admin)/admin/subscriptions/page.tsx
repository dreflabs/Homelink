import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
        <p className="text-muted-foreground">Manage subscription management here.</p>
      </div>
      <div className="bg-white/50 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500">Modul sedang dalam pengembangan tahap lanjut.</p>
      </div>
    </div>
  );
}
