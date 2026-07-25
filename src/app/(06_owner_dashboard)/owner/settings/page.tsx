import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OwnerSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pengaturan</h1>
        <p className="text-gray-500 mt-2">Kelola profil bisnis dan preferensi notifikasi Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil Pemilik</CardTitle>
          <CardDescription>Informasi kontak yang akan ditampilkan ke calon pembeli/penyewa terverifikasi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama Tampilan</Label>
              <Input defaultValue="Siti Aminah" />
            </div>
            <div className="space-y-2">
              <Label>Nomor WhatsApp (Aktif)</Label>
              <Input defaultValue="+62 812-9876-5432" />
            </div>
          </div>
          <Button className="mt-4">Simpan Profil</Button>
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
