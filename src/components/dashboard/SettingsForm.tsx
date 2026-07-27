"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { updateNotificationPreferences } from "@/actions/settings";
import { Loader2, ShieldCheck, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";

export function SettingsForm() {
  const t = useTranslations("BuyerDashboard.settingsForm");
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
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Notifications Section */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{t("notifications.title")}</CardTitle>
          <CardDescription className="text-sm">{t("notifications.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
            <div className="space-y-1 mr-4">
              <Label htmlFor="savedProperties" className="text-base font-semibold cursor-pointer text-gray-900">{t("notifications.savedProperties")}</Label>
              <p className="text-sm text-gray-500 leading-relaxed">{t("notifications.savedPropertiesDesc")}</p>
            </div>
            <Switch
              id="savedProperties"
              checked={prefs.savedProperties}
              onCheckedChange={(c) => handleToggle("savedProperties", c)}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
            <div className="space-y-1 mr-4">
              <Label htmlFor="newMessages" className="text-base font-semibold cursor-pointer text-gray-900">{t("notifications.newMessages")}</Label>
              <p className="text-sm text-gray-500 leading-relaxed">{t("notifications.newMessagesDesc")}</p>
            </div>
            <Switch
              id="newMessages"
              checked={prefs.newMessages}
              onCheckedChange={(c) => handleToggle("newMessages", c)}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
            <div className="space-y-1 mr-4">
              <Label htmlFor="recommendations" className="text-base font-semibold cursor-pointer text-gray-900">{t("notifications.recommendations")}</Label>
              <p className="text-sm text-gray-500 leading-relaxed">{t("notifications.recommendationsDesc")}</p>
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

      {/* Account Security Section (Placeholder for Future) */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-gray-500" />
            <CardTitle className="text-xl">{t("accountSecurity.title")}</CardTitle>
          </div>
          <CardDescription className="text-sm">{t("accountSecurity.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" type="button" className="w-full sm:w-auto">
            {t("accountSecurity.title")}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end items-center gap-4 pt-2">
        {success && (
          <span className="text-sm text-emerald-600 font-medium flex items-center animate-in fade-in slide-in-from-right-2">
            <ShieldCheck className="w-5 h-5 mr-1.5" />
            {t("actions.saved")}
          </span>
        )}
        <Button type="submit" disabled={isPending} className="min-w-[150px] shadow-sm">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("actions.saving")}
            </>
          ) : (
            t("actions.save")
          )}
        </Button>
      </div>
    </form>
  );
}
