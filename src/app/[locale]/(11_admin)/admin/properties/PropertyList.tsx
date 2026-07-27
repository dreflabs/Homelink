"use client";


import { useTranslations } from 'next-intl';
import React, { useState } from "react";
import { Building, Search, MapPin, SlidersHorizontal, MoreVertical, Eye, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableEmptyState } from "@/components/shared/TableEmptyState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PUBLISHED": return "bg-green-100 text-green-700 hover:bg-green-100 border-transparent";
    case "PENDING_REVIEW": return "bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent";
    case "REJECTED": return "bg-red-100 text-red-700 hover:bg-red-100 border-transparent";
    case "DRAFT": return "bg-slate-100 text-slate-700 hover:bg-slate-100 border-transparent";
    default: return "bg-slate-100 text-slate-700 hover:bg-slate-100 border-transparent";
  }
};

export default function PropertyList({ initialProperties }: { initialProperties: any[] }) {
  const tTable = useTranslations('Common.table');
  const tSearch = useTranslations('Common.search');
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedProp, setSelectedProp] = useState<any>(null);

  const filteredData = initialProperties.filter(p => {
    const ownerName = p.owner?.name || p.owner?.email || "Unknown";
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || ownerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 rounded-xl">
            <Building className="w-6 h-6 "  />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Property Management</h1>
            <p className="text-sm text-slate-500">Manage all property listings across the platform.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " />
          <Input 
            placeholder={tSearch("byTitle")} 
            className="pl-9 bg-slate-50 border-transparent focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-56">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "ALL")}>
            <SelectTrigger className="bg-slate-50 border-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-slate-500" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PHYSICAL_VERIFIED">Physical Verified</SelectItem>
              <SelectItem value="LEGAL_VERIFIED">Legal Verified</SelectItem>
              <SelectItem value="FULLY_VERIFIED">Fully Verified</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-3 rounded-xl border border-border/70 shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-medium text-slate-500">Property Title</TableHead>
              <TableHead className="font-medium text-slate-500">Owner</TableHead>
              <TableHead className="font-medium text-slate-500">{tTable('type')}</TableHead>
              <TableHead className="font-medium text-slate-500">Price</TableHead>
              <TableHead className="font-medium text-slate-500">{tTable('status')}</TableHead>
              <TableHead className="font-medium text-slate-500">{tTable('date')}</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((prop) => (
              <TableRow key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-900">{prop.title}</TableCell>
                <TableCell className="text-slate-600">{prop.owner?.name || prop.owner?.email || 'Unknown'}</TableCell>
                <TableCell className="text-slate-600">{prop.type}</TableCell>
                <TableCell className="text-slate-600">Rp {prop.price ? prop.price.toString() : '0'}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(prop.status)}>
                    {prop.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{new Date(prop.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 text-slate-500 h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-100">
                      <DropdownMenuItem onClick={() => setSelectedProp(prop)} className="gap-2 cursor-pointer p-2 rounded-lg m-1">
                        <Eye className="w-5 h-5 " /> View Details
                      </DropdownMenuItem>
                      {prop.status === "PUBLISHED" && (
                        <DropdownMenuItem onClick={() => toast.success("Listing properti berhasil ditangguhkan sementara sesuai regulasi dan pengawasan platform.")} className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 p-2 rounded-lg m-1">
                          <Ban className="w-4 h-4" /> Suspend Listing
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="p-0 border-0">
                  <TableEmptyState
                    title="Tidak Ada Properti"
                    description="Belum ada listing properti yang sesuai dengan filter Anda."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedProp} onOpenChange={() => setSelectedProp(null)}>
        <DialogContent className="max-w-2xl rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <DialogTitle className="text-xl font-semibold text-slate-900">
              {selectedProp?.title}
            </DialogTitle>
          </div>
          
          <div className="grid grid-cols-2 gap-8 p-6">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-slate-500">Property Owner</p>
                <p className="text-base text-slate-900 mt-1">{selectedProp?.owner?.name || selectedProp?.owner?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Property Type</p>
                <p className="text-base text-slate-900 mt-1">{selectedProp?.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Asking Price</p>
                <p className="text-base text-slate-900 mt-1">Rp {selectedProp?.price}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Current Status</p>
                <Badge variant="secondary" className={`mt-2 ${selectedProp ? getStatusColor(selectedProp.status) : ''}`}>
                  {selectedProp?.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <MapPin className="w-5 h-5 " /> Map Coordinates
                </p>
                <p className="text-base text-slate-900 mt-1 font-mono text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {selectedProp?.lat}, {selectedProp?.lng}
                </p>
                <div className="w-full h-36 bg-slate-100 rounded-2xl mt-4 flex items-center justify-center border border-slate-200">
                  <span className="text-sm text-slate-400 font-medium">Map Preview Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
