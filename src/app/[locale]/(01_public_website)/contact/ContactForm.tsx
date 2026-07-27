"use client";

import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  firstName: z.string().min(2, "Minimal 2 karakter"),
  lastName: z.string().min(2, "Minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  message: z.string().min(10, "Minimal 10 karakter")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations('Public.Contact');
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    alert("Pesan terkirim!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('firstName')}</label>
          <Input {...register("firstName")} placeholder={t('firstNamePlaceholder')} className="bg-white" />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('lastName')}</label>
          <Input {...register("lastName")} placeholder={t('lastNamePlaceholder')} className="bg-white" />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">{t('emailAddress')}</label>
        <Input type="email" {...register("email")} placeholder={t('emailPlaceholder')} className="bg-white" />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">{t('yourMessage')}</label>
        <Textarea {...register("message")} placeholder={t('messagePlaceholder')} className="bg-white min-h-[150px]" />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary text-white h-12 text-base font-semibold">
        {t('submit')}
      </Button>
    </form>
  );
}
