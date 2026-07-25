"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { updateOwnerProperty } from "@/actions/dashboard";

export function EditPropertyClient({ property }: { property: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateOwnerProperty(property.id, formData);
      if (result.success) {
        router.push("/owner/properties");
      } else {
        setErrorMessage("Gagal memperbarui properti.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Edit Properti</h1>
          <p className="text-slate-500 mt-2">Perbarui informasi listing properti Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild className="rounded-full px-6">
            <Link href="/owner/properties">Batal</Link>
          </Button>
          <Button type="submit" disabled={loading} className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all">
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
          <CardTitle className="text-xl font-semibold text-slate-800">Detail Properti</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-slate-700 font-medium">Judul Properti</Label>
            <Input id="title" name="title" defaultValue={property.title} required className="h-12 rounded-xl bg-slate-50/50 border-slate-200" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="price" className="text-slate-700 font-medium">Harga (IDR)</Label>
              <Input id="price" name="price" type="number" defaultValue={property.price} required className="h-12 rounded-xl bg-slate-50/50 border-slate-200" />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="propertyType" className="text-slate-700 font-medium">Tipe Properti</Label>
              <Select name="propertyType" defaultValue={property.propertyType}>
                <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-slate-200">
                  <SelectValue placeholder="Pilih Tipe" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="APARTMENT">Apartemen</SelectItem>
                  <SelectItem value="HOUSE">Rumah</SelectItem>
                  <SelectItem value="VILLA">Villa</SelectItem>
                  <SelectItem value="LAND">Tanah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="address" className="text-slate-700 font-medium">Alamat Lengkap</Label>
            <Input id="address" name="address" defaultValue={property.address} required className="h-12 rounded-xl bg-slate-50/50 border-slate-200" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-slate-700 font-medium">Deskripsi</Label>
            <Textarea id="description" name="description" defaultValue={property.description} className="min-h-[140px] rounded-xl bg-slate-50/50 border-slate-200" />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
