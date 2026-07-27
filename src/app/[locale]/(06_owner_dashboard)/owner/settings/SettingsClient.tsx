"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/actions/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SettingsClient({ profile }: { profile: any }) {
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateUserProfile({ name, email });
        setMessage("Profil berhasil diperbarui.");
      } catch (err: any) {
        setMessage("Gagal memperbarui profil.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3 text-sm bg-slate-50 text-primary border border-slate-200 rounded-md">
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profil Pemilik</CardTitle>
          <CardDescription>Informasi kontak yang akan ditampilkan ke calon pembeli/penyewa terverifikasi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama Tampilan</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleSave} disabled={isPending} className="mt-4">
            {isPending ? "Menyimpan..." : "Simpan Profil"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifikasi</CardTitle>
          <CardDescription>Pilih jenis notifikasi yang ingin Anda terima.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Permintaan Kunjungan Baru</Label>
              <p className="text-sm text-gray-500">Pemberitahuan instan via email saat ada permintaan jadwal kunjungan.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Pesan Masuk</Label>
              <p className="text-sm text-gray-500">Pemberitahuan saat ada pesan dari calon pembeli.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Laporan Performa Mingguan</Label>
              <p className="text-sm text-gray-500">Terima ringkasan tayangan dan interaksi setiap minggu.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
