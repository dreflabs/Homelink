"use client";

import { useState, useRef, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { updateProfile, uploadProfileImage } from "@/actions/profile";
import { toast } from "sonner";

interface ProfileProps {
  initialData: {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    address: string;
  };
}

export function ProfileForm({ initialData }: ProfileProps) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    const result = await uploadProfileImage(formData);
    
    setIsUploading(false);

    if (result.success) {
      toast.success("Foto profil berhasil diperbarui.");
    } else {
      toast.error(result.error || "Gagal mengunggah foto.");
    }
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success("Profil berhasil diperbarui.");
      } else {
        toast.error(result.error || "Gagal memperbarui profil.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Foto Profil</CardTitle>
          <CardDescription>Pilih foto yang jelas agar agen mudah mengenali Anda.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100">
            <Image src={initialData.avatar} alt={initialData.name} fill className="object-cover" />
          </div>
          <div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/jpeg, image/png, image/webp"
              onChange={handlePhotoUpload}
            />
            <Button variant="outline" className="gap-2" onClick={handlePhotoClick} disabled={isUploading}>
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              {isUploading ? "Mengunggah..." : "Ubah Foto"}
            </Button>
            <p className="text-xs text-gray-500 mt-2">Format yang didukung: JPG, PNG. Maks 2MB.</p>
          </div>
        </CardContent>
      </Card>

      <form action={handleSubmit} key={JSON.stringify(initialData)}>
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pribadi</CardTitle>
            <CardDescription>Data ini digunakan untuk keperluan administrasi dan penawaran.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" name="name" defaultValue={initialData.name} required minLength={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={initialData.email} disabled />
                <p className="text-xs text-gray-500">Email tidak dapat diubah.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" name="phone" type="tel" defaultValue={initialData.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat Domisili</Label>
                <Input id="address" name="address" defaultValue={initialData.address} />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Simpan Perubahan
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
