"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageCircle, Smartphone, Globe, Moon, Shield } from "lucide-react";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AgentSettingsPage() {
  const t = useTranslations('PartnerAgent.Settings');

  const notificationSettings: SettingItem[] = [
    {
      id: "email_leads",
      label: t('notifications.emailLeadsLabel'),
      description: t('notifications.emailLeadsDesc'),
      icon: Mail,
    },
    {
      id: "email_commission",
      label: t('notifications.emailCommissionLabel'),
      description: t('notifications.emailCommissionDesc'),
      icon: Shield,
    },
    {
      id: "push_reminder",
      label: t('notifications.pushReminderLabel'),
      description: t('notifications.pushReminderDesc'),
      icon: Bell,
    },
    {
      id: "sms_closing",
      label: t('notifications.smsClosingLabel'),
      description: t('notifications.smsClosingDesc'),
      icon: Smartphone,
    },
    {
      id: "in_app",
      label: t('notifications.inAppLabel'),
      description: t('notifications.inAppDesc'),
      icon: MessageCircle,
    },
  ];

  const preferenceSettings: SettingItem[] = [
    {
      id: "dark_mode",
      label: t('preferences.darkModeLabel'),
      description: t('preferences.darkModeDesc'),
      icon: Moon,
    },
    {
      id: "lang_en",
      label: t('preferences.langEnLabel'),
      description: t('preferences.langEnDesc'),
      icon: Globe,
    },
  ];

  const [notifStates, setNotifStates] = useState<Record<string, boolean>>({
    email_leads: true,
    email_commission: true,
    push_reminder: true,
    sms_closing: false,
    in_app: true,
  });
  const [prefStates, setPrefStates] = useState<Record<string, boolean>>({
    dark_mode: false,
    lang_en: false,
  });

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('title')}</h1>
        <p className="text-slate-500 mt-1 text-sm">
          {t('description')}
        </p>
      </div>

      {/* Notification Settings */}
      <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-5 h-5 " />
          <h2 className="font-semibold text-slate-900">{t('notification')}</h2>
          <Badge variant="outline" className="text-xs ml-auto bg-blue-50 text-blue-700 border-blue-200">
            {Object.values(notifStates).filter(Boolean).length} {t('active')}
          </Badge>
        </div>
        <div className="divide-y divide-slate-100">
          {notificationSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{setting.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{setting.description}</p>
                  </div>
                </div>
                <Toggle
                  checked={notifStates[setting.id]}
                  onChange={(v) => setNotifStates((prev) => ({ ...prev, [setting.id]: v }))}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Preferences */}
      <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-slate-900">{t('displayPreferences')}</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {preferenceSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{setting.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{setting.description}</p>
                  </div>
                </div>
                <Toggle
                  checked={prefStates[setting.id]}
                  onChange={(v) => setPrefStates((prev) => ({ ...prev, [setting.id]: v }))}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Security */}
      <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
        <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 " /> {t('security')}
        </h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm">
            <span className="font-medium text-slate-700">{t('changePassword')}</span>
            <span className="text-slate-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm">
            <span className="font-medium text-slate-700">{t('twoFactor')}</span>
            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
              {t('inactive')}
            </Badge>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm">
            <span className="font-medium text-slate-700">{t('loginHistory')}</span>
            <span className="text-slate-400">›</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
