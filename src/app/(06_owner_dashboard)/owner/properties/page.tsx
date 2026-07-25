"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, SlidersHorizontal, MoreVertical, Trash2, Edit2, Activity, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import Link from "next/link";
import { getOwnerProperties, deleteOwnerProperty } from "@/actions/dashboard";

// Remove Mock Data types and data, but keep basic types since it might be needed for the state, or redefine them.
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

function MyPropertiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const statusFilter = (searchParams.get("status") as PropertyStatus) || "ALL";
  const typeFilter = (searchParams.get("type") as PropertyType) || "ALL";

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = () => {
    setLoading(true);
    getOwnerProperties(statusFilter, typeFilter)
      .then((data) => {
        setProperties(data as Property[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch owner properties:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter, typeFilter]);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus properti ini?")) {
      try {
        await deleteOwnerProperty(id);
        fetchProperties();
      } catch (err) {
        alert("Gagal menghapus properti.");
      }
    }
  };

  const updateFilters = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === "ALL") {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/owner/properties${query}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listing Saya</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola dan pantau seluruh properti Anda di satu tempat.</p>
        </div>
        <Button asChild className="bg-[#4169E1] hover:bg-blue-700">
          <Link href="/owner/properties/new">Tambah Properti</Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border">
        <Tabs 
          defaultValue={statusFilter} 
          onValueChange={(val) => updateFilters("status", val)}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto overflow-x-auto justify-start">
            <TabsTrigger value="ALL">Semua</TabsTrigger>
            <TabsTrigger value="PUBLISHED">Aktif (Live)</TabsTrigger>
            <TabsTrigger value="PENDING_REVIEW">Menunggu Review</TabsTrigger>
            <TabsTrigger value="DRAFT">Draf</TabsTrigger>
            <TabsTrigger value="REJECTED">Ditolak</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-5 h-5 text-gray-500" />
          <Select value={typeFilter} onValueChange={(val) => updateFilters("type", val ?? "ALL")}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Tipe Properti" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Tipe</SelectItem>
              <SelectItem value="HOUSE">Rumah</SelectItem>
              <SelectItem value="APARTMENT">Apartemen</SelectItem>
              <SelectItem value="LAND">Tanah</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 h-80 animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada properti</h3>
          <p className="text-gray-500 mb-4 text-sm max-w-sm mx-auto">
            Tidak ada listing yang sesuai dengan filter Anda, atau Anda belum menambahkan properti.
          </p>
          <Button variant="outline" onClick={() => updateFilters("status", "ALL")} className="mr-2">Reset Filter</Button>
          <Button asChild className="bg-[#4169E1] hover:bg-blue-700">
            <Link href="/owner/properties/new">Tambah Sekarang</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative w-full h-48 bg-slate-100 flex items-center justify-center">
                {getStatusBadge(property.status)}
                {property.imageUrl ? (
                  <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
                ) : (
                  <Building2 className="w-12 h-12 text-slate-300" />
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
                        <Users className="w-4 h-4 mr-2" />
                        Lihat Leads
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(property.id)} className="text-red-500 focus:text-red-500 focus:bg-red-50">
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
      )}
    </div>
  );
}

export default function MyPropertiesPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Memuat properti...</div>}>
      <MyPropertiesContent />
    </Suspense>
  );
}
