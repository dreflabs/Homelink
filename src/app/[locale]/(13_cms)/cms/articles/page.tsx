import { getTranslations } from 'next-intl/server';
import React from "react"
import { Plus } from "lucide-react"
import prisma from "@/lib/prisma";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableEmptyState } from "@/components/shared/TableEmptyState"

export default async function ArticlesPage() {
  const tTable = await getTranslations('Common.table');

  const articles = await prisma.article.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Artikel</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tulis Artikel Baru
          </Button>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto pb-2 rounded-xl border border-border/70 shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{tTable('title')}</TableHead>
              <TableHead>{tTable('category')}</TableHead>
              <TableHead>{tTable('status')}</TableHead>
              <TableHead>{tTable('author')}</TableHead>
              <TableHead>{tTable('date')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-semibold text-foreground">{article.title}</TableCell>
                <TableCell className="text-muted-foreground">{article.category?.name || "-"}</TableCell>
                <TableCell>
                  <Badge variant={article.status === "PUBLISHED" ? "default" : "secondary"}>
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{article.author?.name || "-"}</TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
            {articles.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="p-0 border-0">
                  <TableEmptyState
                    title="Belum Ada Artikel"
                    description="Belum ada artikel yang dipublikasikan atau disimpan di dalam draf Anda."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
