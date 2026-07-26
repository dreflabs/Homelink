"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { updateNotificationPreferences } from "@/actions/settings";
import { Loader2, ShieldCheck } from "lucide-react";

export function SettingsForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  // Local state for immediate UI feedback
  const [prefs, setPrefs] = useState({
    savedProperties: true,
    newMessages: true,
    recommendations: false,
  });

  const handleToggle = (key: keyof typeof prefs, checked: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: checked }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("savedProperties", String(prefs.savedProperties));
      formData.append("newMessages", String(prefs.newMessages));
      formData.append("recommendations", String(prefs.recommendations));

      try {
        const result = await updateNotificationPreferences(formData);
        if (result.success) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (error) {
        console.error("Failed to update settings", error);
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifikasi Email</CardTitle>
          <CardDescription>Pilih jenis notifikasi yang ingin Anda terima via email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="savedProperties" className="text-base cursor-pointer">Properti Tersimpan</Label>
              <p className="text-sm text-gray-500">Pemberitahuan perubahan harga atau status pada properti favorit Anda.</p>
            </div>
            <Switch
              id="savedProperties"
              checked={prefs.savedProperties}
              onCheckedChange={(c) => handleToggle("savedProperties", c)}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newMessages" className="text-base cursor-pointer">Pesan Baru</Label>
              <p className="text-sm text-gray-500">Pemberitahuan saat pemilik properti membalas pesan Anda.</p>
            </div>
            <Switch
              id="newMessages"
              checked={prefs.newMessages}
              onCheckedChange={(c) => handleToggle("newMessages", c)}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recommendations" className="text-base cursor-pointer">Rekomendasi Properti</Label>
              <p className="text-sm text-gray-500">Menerima rekomendasi properti mingguan sesuai kriteria Anda.</p>
            </div>
            <Switch
              id="recommendations"
              checked={prefs.recommendations}
              onCheckedChange={(c) => handleToggle("recommendations", c)}
              disabled={isPending}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end items-center gap-4">
        {success && (
          <span className="text-sm text-emerald-600 font-medium flex items-center animate-in fade-in slide-in-from-right-2">
            <ShieldCheck className="w-5 h-5 mr-1.5" />
            Tersimpan
          </span>
        )}
        <Button type="submit" disabled={isPending} className="min-w-[150px]">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Simpan Pengaturan"
          )}
        </Button>
      </div>
    </form>
  );
}
