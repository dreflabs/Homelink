"use client";


import { useTranslations } from 'next-intl';
import React, { useState } from "react";
import { 
  ClipboardCheck, 
  Search, 
  Clock, 
  ShieldCheck, 
  XCircle,
  FileCheck2,
  ChevronRight
} from "lucide-react";
import { verifyProperty } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Dummy Data
const QUEUE_DATA = [
  { id: "VER-001", propId: "PROP-005", title: "Rumah Mewah Pondok Indah", owner: "Kevin Sanjaya", status: "LEGAL_VERIFIED", hoursLeft: 4, lat: -6.2845, lng: 106.7821 },
  { id: "VER-002", propId: "PROP-006", title: "Tanah Kavling Bogor", owner: "Diana Putri", status: "PHYSICAL_VERIFIED", hoursLeft: 14, lat: -6.5971, lng: 106.7932 },
  { id: "VER-003", propId: "PROP-007", title: "Apartemen SCBD", owner: "Reza Rahadian", status: "PENDING", hoursLeft: 22, lat: -6.2256, lng: 106.8081 },
  { id: "VER-004", propId: "PROP-008", title: "Ruko Thamrin", owner: "Luna Maya", status: "PENDING", hoursLeft: -2, lat: -6.1872, lng: 106.8225 },
];

const getSlaColor = (hours: number) => {
  if (hours < 0) return "bg-red-100 text-red-700 border-red-200";
  if (hours <= 12) return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
};

export default function VerificationQueuePage() {
  const tTable = useTranslations('Common.table');

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [viewDetails, setViewDetails] = useState<any>(null);

  const handleRejectClick = (item: any) => {
    setSelectedItem(item);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  const handleVerifyAction = async (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
    try {
      await verifyProperty(id, status, reason);
      if (status === 'APPROVED') {
        toast.success("Listing properti berhasil disetujui dan siap dipublikasikan ke publik!");
      } else {
        toast.success("Listing properti ditolak sesuai prosedur regulasi dan catatan dikirimkan ke pemilik.");
      }
      setRejectModalOpen(false);
      if (viewDetails && viewDetails.id === id) {
        setViewDetails(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal melakukan aksi verifikasi pada properti ini. Silakan hubungi tim teknis atau coba kembali.");
    }
  };

  const submitReject = () => {
    if (selectedItem) {
      handleVerifyAction(selectedItem.id, 'REJECTED', rejectReason);
    }
  };

  if (viewDetails) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => setViewDetails(null)} className="mb-2 text-slate-500 hover:text-slate-900 rounded-xl">
          ← Back to Queue
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Verify: {viewDetails.title}</h1>
            <p className="text-sm text-slate-500 mt-1">Compare owner's documents with physical surveyor data.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl" onClick={() => handleVerifyAction(viewDetails.id, 'REJECTED')}>
              <XCircle className="w-4 h-4 mr-2" /> Reject
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md rounded-xl" onClick={() => handleVerifyAction(viewDetails.id, 'APPROVED')}>
              <ShieldCheck className="w-5 h-5 mr-2" /> Approve Listing
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <FileCheck2 className="w-5 h-5 " />
              <h3 className="text-lg font-medium text-slate-900">Legal Documents</h3>
            </div>
            <div className="aspect-[3/4] bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200">
              <FileCheck2 className="w-12 h-12  mb-4" />
              <span className="text-slate-400 font-medium">Owner KTP & SHM Viewer</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <Search className="w-5 h-5 " />
              <h3 className="text-lg font-medium text-slate-900">Surveyor Field Photos</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200 p-4">
                <span className="text-slate-400 font-medium">Front View</span>
                <span className="text-xs text-primary mt-3 font-mono bg-slate-50 px-2 py-1 rounded-md">
                  {viewDetails.lat}, {viewDetails.lng}
                </span>
              </div>
              <div className="aspect-square bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200 p-4">
                <span className="text-slate-400 font-medium">Street View</span>
                <span className="text-xs text-primary mt-3 font-mono bg-slate-50 px-2 py-1 rounded-md">
                  {viewDetails.lat}, {viewDetails.lng}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
          <DialogContent className="max-w-md rounded-3xl p-6 border-0 shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-semibold text-slate-900">Reject Property</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <p className="text-sm text-slate-500 leading-relaxed">
                Please provide a reason for rejecting <span className="font-medium text-slate-900">{selectedItem?.title}</span>. This will be sent to the owner via email.
              </p>
              <Textarea 
                placeholder="E.g., The provided KTP does not match the name on the SHM document..." 
                className="min-h-[140px] resize-none focus-visible:ring-red-500 rounded-xl"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                aria-required="true"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button variant="ghost" onClick={() => setRejectModalOpen(false)} className="rounded-xl">Cancel</Button>
              <Button variant="destructive" disabled={rejectReason.trim().length === 0} onClick={() => handleVerifyAction(selectedItem?.id!, 'REJECTED', rejectReason)} className="rounded-xl">
                Submit Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-50 rounded-xl">
          <ClipboardCheck className="w-6 h-6 text-primary"  />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Verification Queue</h1>
          <p className="text-sm text-slate-500 mt-1">24-hour SLA critical queue. Approve or reject pending properties.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-6">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-medium text-slate-500 w-32 py-4">SLA Timer</TableHead>
              <TableHead className="font-medium text-slate-500 py-4">Property Title</TableHead>
              <TableHead className="font-medium text-slate-500 py-4">Owner</TableHead>
              <TableHead className="font-medium text-slate-500 py-4">Current Stage</TableHead>
              <TableHead className="text-right font-medium text-slate-500 py-4 pr-6">{tTable('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {QUEUE_DATA.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-4">
                  <Badge variant="outline" className={`whitespace-nowrap font-mono gap-1.5 px-2.5 py-1 ${getSlaColor(item.hoursLeft)}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {item.hoursLeft < 0 ? `Late ${Math.abs(item.hoursLeft)}h` : `${item.hoursLeft}h left`}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-slate-900 py-4">{item.title}</TableCell>
                <TableCell className="text-slate-600 py-4">{item.owner}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-transparent">
                    {item.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <div className="flex items-center justify-end gap-3">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-lg h-9 px-3" onClick={() => handleVerifyAction(item.id, 'REJECTED')}>
                      <XCircle className="w-4 h-4 mr-1.5" /> Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-sm rounded-lg h-9 px-3" onClick={() => handleVerifyAction(item.id, 'APPROVED')}>
                      <ShieldCheck className="w-5 h-5 mr-1.5" /> Approve
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary rounded-lg h-9 px-3" onClick={() => setViewDetails(item)}>
                      Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {QUEUE_DATA.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-slate-500">
                  No properties in the verification queue.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 border-0 shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-slate-900">Reject Property Verification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-500 leading-relaxed">
              Please provide a reason for rejecting <span className="font-medium text-slate-900">{selectedItem?.title}</span>. This will be sent to the owner via email.
            </p>
            <Textarea 
              placeholder="E.g., The provided KTP does not match the name on the SHM document..." 
              className="min-h-[140px] resize-none focus-visible:ring-red-500 rounded-xl"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              aria-required="true"
            />
          </div>
          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setRejectModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" disabled={rejectReason.trim().length === 0} onClick={() => selectedItem && handleVerifyAction(selectedItem.id, 'REJECTED', rejectReason)} className="rounded-xl">
              Submit Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
