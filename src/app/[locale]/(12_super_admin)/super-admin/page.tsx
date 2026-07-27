import prisma from "@/lib/prisma";
import { UserRound, Building } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"

export default async function SuperAdminDashboardPage() {
  const [userCount, propertyCount] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
  ])

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* User Count Tile */}
        <Card className="shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-border/40 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-muted-foreground font-medium">Total UserRound</CardTitle>
            <CardDescription className="sr-only">Count of all registered users on the platform</CardDescription>
            <CardAction>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500/10 ring-1 ring-primary/20">
                <UserRound className="h-5 w-5  dark:" />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight text-foreground">
              {userCount.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-muted-foreground font-medium">
              Registered accounts across the platform
            </p>
          </CardContent>
        </Card>

        {/* Property Count Tile */}
        <Card className="shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-border/40 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-muted-foreground font-medium">Total Properties</CardTitle>
            <CardDescription className="sr-only">Count of all active properties on the platform</CardDescription>
            <CardAction>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <Building className="h-5 w-5  dark:" />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight text-foreground">
              {propertyCount.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-muted-foreground font-medium">
              Active listings on the platform
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
