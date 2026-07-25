import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pengaturan</h1>
        <p className="text-gray-500 mt-2">Atur preferensi akun dan notifikasi Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifikasi Email</CardTitle>
          <CardDescription>Pilih jenis notifikasi yang ingin Anda terima via email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Properti Tersimpan</Label>
              <p className="text-sm text-gray-500">Pemberitahuan perubahan harga atau status pada properti favorit Anda.</p>
            </div>
            {/* We will mock the Switch component since it might need a client component, or just use it if it works */}
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Pesan Baru</Label>
              <p className="text-sm text-gray-500">Pemberitahuan saat pemilik properti membalas pesan Anda.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Rekomendasi Properti</Label>
              <p className="text-sm text-gray-500">Menerima rekomendasi properti mingguan sesuai kriteria Anda.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Simpan Pengaturan</Button>
      </div>
    </div>
  );
}
