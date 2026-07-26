"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Building, MoreVertical, Trash2, Edit2, Activity, UserRound, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { deleteOwnerProperty } from "@/actions/dashboard";
import { toast } from "sonner";

type PropertyStatus = "ALL" | "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED";
type PropertyType = "ALL" | "HOUSE" | "APARTMENT" | "LAND";

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  status: PropertyStatus | string;
  propertyType: PropertyType | string;
  imageUrl?: string | null;
}

const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const getStatusBadge = (status: PropertyStatus | string) => {
  switch (status) {
    case "PUBLISHED":
      return <Badge className="bg-green-500 hover:bg-green-600 absolute top-3 left-3">Aktif (Live)</Badge>;
    case "PENDING_REVIEW":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 absolute top-3 left-3 text-black">Menunggu Review</Badge>;
    case "REJECTED":
      return <Badge className="bg-red-500 hover:bg-red-600 absolute top-3 left-3">Ditolak</Badge>;
    case "DRAFT":
      return <Badge className="bg-slate-500 hover:bg-slate-600 absolute top-3 left-3">Draf</Badge>;
    default:
      return null;
  }
};

interface PropertiesClientProps {
  initialProperties: Property[];
}

export function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetTitle, setDeleteTargetTitle] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openDeleteDialog = (id: string, title: string) => {
    setDeleteTargetId(id);
    setDeleteTargetTitle(title);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;

    startTransition(async () => {
      try {
        await deleteOwnerProperty(deleteTargetId);
        toast.success("Properti berhasil dihapus.");
        setIsDeleteDialogOpen(false);
        router.refresh();
      } catch (err) {
        toast.error("Gagal menghapus properti. Silakan coba lagi.");
      }
    });
  };

  if (initialProperties.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed">
        <Building className="w-12 h-12  mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada properti</h3>
        <p className="text-gray-500 mb-4 text-sm max-w-sm mx-auto">
          Tidak ada listing yang sesuai dengan filter Anda, atau Anda belum menambahkan properti.
        </p>
        <Button asChild className="bg-[#4169E1] hover:bg-blue-700">
          <Link href="/owner/properties/new">Tambah Sekarang</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialProperties.map((property) => (
          <Card key={property.id} className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="relative w-full h-48 bg-slate-100 flex items-center justify-center">
              {getStatusBadge(property.status)}
              {property.imageUrl ? (
                <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
              ) : (
                <Building className="w-12 h-12 " />
              )}
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 -mt-2 -mr-2 h-8 w-8 text-gray-500" aria-label="Aksi lainnya">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => router.push(`/owner/properties/${property.id}/edit`)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/owner/property-status')}>
                      <Activity className="w-4 h-4 mr-2" />
                      Lihat Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/owner/properties/${property.id}/leads`)}>
                      <UserRound className="w-5 h-5 mr-2" />
                      Lihat Leads
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(property.id, property.title)}
                      className="text-red-500 focus:text-red-500 focus:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-gray-500 line-clamp-1 mb-4">{property.address}</p>
              <div className="flex justify-between items-end">
                <p className="text-[#4169E1] font-bold text-lg">{formatRupiah(property.price)}</p>
                <Button variant="link" onClick={() => router.push(`/owner/properties/${property.id}/analytics`)} className="text-[#4169E1] p-0 h-auto font-medium">
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 " />
              Hapus Properti
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus properti <span className="font-semibold text-gray-900">"{deleteTargetTitle}"</span>? Tindakan ini tidak dapat dibatalkan dan semua data terkait akan ikut terhapus.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isPending ? "Menghapus..." : "Ya, Hapus Properti"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
