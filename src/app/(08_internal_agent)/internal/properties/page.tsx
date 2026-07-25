import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, FileText } from "lucide-react"

import prisma from "@/lib/prisma";

export default async function PropertyReviewPage() {
  const properties = await prisma.property.findMany({
    include: {
      owner: true
    }
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tinjauan Properti</h1>
        <p className="text-slate-500 mt-2">Kelola daftar properti baru yang menunggu persetujuan (Listing Review).</p>
      </div>

      <Card className="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100">
        <CardHeader className="bg-slate-50/80 border-b border-slate-100 rounded-t-2xl px-6 py-5">
          <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
            Daftar Properti Baru
          </CardTitle>
          <CardDescription>
            Tinjau dan ambil tindakan untuk properti yang baru didaftarkan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-700 pl-6 py-4">Nama Properti</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">Pemilik</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">Harga</TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-medium text-slate-900 pl-6 py-4">
                    {property.title}
                  </TableCell>
                  <TableCell className="text-slate-600 py-4">
                    {property.owner?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-slate-900 font-medium py-4">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(property.price))}
                  </TableCell>
                  <TableCell className="py-4 pr-6">
                    <div className="flex items-center justify-end gap-4">
                      <Badge variant="pending" className="px-2.5 py-1 text-xs font-medium">
                        {property.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg h-9 px-4 gap-2 shadow-sm transition-all"
                        >
                          <Check className="w-4 h-4" strokeWidth={1.5} />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 rounded-lg h-9 px-4 gap-2 transition-all"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
