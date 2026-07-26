"use client"

import * as React from "react"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, UserRound, Mail, Phone, Lock, Home, Search, Ruler } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AuthShowcase } from "@/components/auth/AuthShowcase"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const registerSchema = z.object({
  role: z.enum(["BUYER", "OWNER", "SURVEYOR"], { message: "Peran harus dipilih" }),
  fullName: z.string().min(2, "Nama lengkap harus minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phoneNumber: z.string().regex(/^(\+62|0)[0-9]{9,13}$/, "Nomor telepon tidak valid (Contoh: 0812...)"),
  password: z.string().regex(passwordRegex, "Password minimal 8 karakter, 1 huruf besar, dan 1 angka"),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

const ROLES = [
  { value: "BUYER", label: "Pembeli", desc: "Cari properti", icon: Search },
  { value: "OWNER", label: "Pemilik", desc: "Pasang iklan", icon: Home },
  { value: "SURVEYOR", label: "Surveyor", desc: "Verifikasi", icon: Ruler },
] as const

const inputClass = "h-12 bg-white border border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-600 transition-all text-slate-900 placeholder:text-slate-400"
const labelClass = "text-[11px] font-semibold text-slate-400 uppercase tracking-[0.08em]"

export default function RegisterPage() {
  const t = useTranslations("Auth.register")
  const [showPassword, setShowPassword] = React.useState(false)
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "BUYER",
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phoneNumber,
          role: data.role,
          password: data.password,
          agreedToTerms: data.agreedToTerms,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Akun berhasil dibuat!", { description: result.message });
        router.push("/verify-email");
      } else {
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            const formKey = key === 'name' ? 'fullName' : key === 'phone' ? 'phoneNumber' : key;
            form.setError(formKey as any, { type: 'server', message: result.errors[key][0] });
          });
          toast.error("Pendaftaran gagal", { description: "Periksa kembali data Anda." });
        } else {
          toast.error("Pendaftaran gagal", { description: result.message });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Koneksi gagal", { description: "Silakan coba beberapa saat lagi." });
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ─── Left: Showcase Panel ─── */}
      <AuthShowcase
        quote={t("showcase.quote")}
        author={t("showcase.author")}
        role={t("showcase.role")}
      />

      {/* ─── Right: Form Panel ─── */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-white overflow-y-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between px-10 py-5 border-b border-slate-100 shrink-0">
          <Link href="/">
            <Image
              src="/LOGO_UTAMA_HOMELINK.png"
              alt="HomeLink"
              width={130}
              height={38}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-900 transition-colors">
              Masuk
            </Link>
          </p>
        </div>

        {/* Form body */}
        <div className="flex-1 px-10 py-8">
          <div className="max-w-[440px] mx-auto">

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-[28px] font-bold tracking-tight text-slate-900 mb-1.5">
                {t("title")}
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* ── Role Selector: 3 pill cards ── */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>{t("role")}</FormLabel>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {ROLES.map(({ value, label, desc, icon: Icon }) => {
                          const selected = field.value === value
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => field.onChange(value)}
                              className={cn(
                                "relative flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-3 px-2 transition-all duration-150 cursor-pointer select-none",
                                selected
                                  ? "border-blue-600 bg-blue-50 text-blue-700"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                              )}
                            >
                              <Icon className={cn("w-5 h-5", selected ? "text-blue-600" : "text-slate-400")} />
                              <span className={cn("text-sm font-semibold leading-none", selected ? "text-blue-700" : "text-slate-700")}>
                                {label}
                              </span>
                              <span className={cn("text-[10px] leading-none", selected ? "text-blue-500" : "text-slate-400")}>
                                {desc}
                              </span>
                              {selected && (
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Full Name ── */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>{t("fullname")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input className={`${inputClass} pl-10`} placeholder={t("fullname_placeholder")} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Email ── */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>{t("email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input className={`${inputClass} pl-10`} type="email" placeholder={t("email_placeholder")} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Phone ── */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>{t("phone")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input className={`${inputClass} pl-10`} type="tel" placeholder={t("phone_placeholder")} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Password + Confirm ── */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>{t("password")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              className={`${inputClass} pl-10 pr-10`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Min 8 karakter"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>{t("confirm")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              className={`${inputClass} pl-10`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Ulangi password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[11px]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── Terms ── */}
                <FormField
                  control={form.control}
                  name="agreedToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-slate-300"
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal text-sm text-slate-500 leading-relaxed cursor-pointer">
                          Saya menyetujui{" "}
                          <Link href="/terms" className="text-blue-700 hover:underline font-medium">Syarat & Ketentuan</Link>
                          {" "}serta{" "}
                          <Link href="/privacy" className="text-blue-700 hover:underline font-medium">Kebijakan Privasi</Link>
                          {" "}HomeLink.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {form.formState.errors.agreedToTerms && (
                  <p className="text-[0.8rem] font-medium text-red-600">
                    {form.formState.errors.agreedToTerms.message}
                  </p>
                )}

                {/* ── Submit ── */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all mt-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Membuat akun...</>
                  ) : (
                    t("submit")
                  )}
                </Button>

                <p className="text-center text-sm text-slate-400 pb-4">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                    Masuk di sini
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
