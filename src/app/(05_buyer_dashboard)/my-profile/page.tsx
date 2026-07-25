import { getBuyerDashboard } from "@/actions/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";

export default async function MyProfilePage() {
  const data = await getBuyerDashboard();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profil Saya</h1>
        <p className="text-gray-500 mt-2">Kelola informasi pribadi dan kontak Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Foto Profil</CardTitle>
          <CardDescription>Pilih foto yang jelas agar agen mudah mengenali Anda.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100">
            <Image src={data.profile.avatar} alt={data.profile.name} fill className="object-cover" />
          </div>
          <div>
            <Button variant="outline" className="gap-2">
              <Camera className="w-4 h-4" />
              Ubah Foto
            </Button>
            <p className="text-xs text-gray-500 mt-2">Format yang didukung: JPG, PNG. Maks 2MB.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>Data ini digunakan untuk keperluan administrasi dan penawaran.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" defaultValue={data.profile.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={data.profile.email} disabled />
              <p className="text-xs text-gray-500">Email tidak dapat diubah.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" type="tel" defaultValue={data.profile.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Domisili</Label>
              <Input id="address" defaultValue={data.profile.address} />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
