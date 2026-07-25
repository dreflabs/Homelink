"use client";

import { useState } from "react";
import { updateUserProfile } from "@/actions/dashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Save, Camera } from "lucide-react";
import { toast } from "sonner";

export default function AgentProfilePage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Alex Property");
  const [email, setEmail] = useState("alex.property@homelink.id");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ name, email });
      toast.success("Profil berhasil diperbarui!");
    } catch {
      toast.error("Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profil Saya</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Kelola informasi akun dan data profil agen Anda.
        </p>
      </div>

      {/* Avatar Section */}
      <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-2xl shadow-md">
              AP
            </div>
            <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{name}</h2>
            <p className="text-sm text-slate-500">{email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                Pro Partner
              </Badge>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
              >
                Aktif
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-5">Informasi Akun</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Nama Lengkap
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 rounded-xl border-slate-200 focus-visible:ring-blue-500"
                placeholder="Nama lengkap Anda"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Alamat Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-xl border-slate-200 focus-visible:ring-blue-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Role</Label>
            <Input
              value="PARTNER_AGENT"
              disabled
              className="rounded-xl border-slate-200 bg-slate-50 text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Member Sejak</Label>
            <Input
              value="10 Januari 2026"
              disabled
              className="rounded-xl border-slate-200 bg-slate-50 text-slate-400"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="rounded-2xl shadow-sm border-red-100 bg-red-50/30 p-6">
        <h3 className="font-semibold text-red-700 mb-2">Zona Bahaya</h3>
        <p className="text-sm text-slate-500 mb-4">
          Tindakan berikut bersifat permanen dan tidak dapat dibatalkan.
        </p>
        <Button
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl text-sm"
        >
          Nonaktifkan Akun
        </Button>
      </Card>
    </div>
  );
}
