"use client"

import * as React from "react"
import Image from "next/image";
import { z } from "zod"
import { useForm } from "react-hook-form"
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
import { Loader2, Eye, EyeOff, UserRound, Mail, Phone, Lock, Home, Search, Ruler, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/shared/Logo"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const registerSchema = z.object({
  role: z.enum(["BUYER", "OWNER", "SURVEYOR"], { message: "Peran harus dipilih" }),
  fullName: z.string().min(2, "Nama lengkap harus minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phoneNumber: z.string().regex(/^(\+62|0)[0-9]{9,13}$/, "Nomor telepon tidak valid (Contoh: 0812...)"),
  password: z.string()
    .regex(passwordRegex, "Password minimal 8 karakter, 1 huruf besar, 1 angka")
    .refine((pw) => !["password123", "12345678", "qwerty", "admin123"].includes(pw.toLowerCase()), {
      message: "Password terlalu umum, gunakan kombinasi yang lebih unik."
    }),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>

const ROLES = [
  { value: "BUYER", label: "Pencari Properti", desc: "Temukan hunian impian Anda", icon: Search },
  { value: "OWNER", label: "Pemilik Properti", desc: "Sewakan atau jual aset Anda", icon: Home },
  { value: "SURVEYOR", label: "Mitra Surveyor", desc: "Bantu kami memverifikasi listing", icon: Ruler },
] as const

const inputClass = "h-12 bg-white/60 border border-slate-200/60 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
const labelClass = "text-xs font-semibold text-slate-600 uppercase tracking-widest ml-1"

export default function RegisterPage() {
  const t = useTranslations("Auth.register")
  const [showPassword, setShowPassword] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(1)
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
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
  const currentPassword = form.watch("password")

  // Calculate password strength
  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    return score; 
  };
  const strengthScore = getPasswordStrength(currentPassword || "");

  const handleNextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ["role"];
    if (currentStep === 2) fieldsToValidate = ["fullName", "email", "phoneNumber"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

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
    <div className="flex min-h-screen relative overflow-hidden bg-slate-950">
      <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" alt="Background" fill className="object-cover pointer-events-none -z-0" priority />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-screen">
        
        {/* ─── Left: Immersive Hero Panel ─── */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-20 text-white">
          <div>
            <Logo size="lg" variant="light" />
          </div>
          
          <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-semibold tracking-wider uppercase">Terverifikasi 100%</span>
            </div>
            <h1 className="text-4xl lg:text-5xl leading-tight font-semibold tracking-tight mb-6">
              Langkah pertama menuju properti impian Anda.
            </h1>
            <p className="text-lg text-slate-200/90 font-medium max-w-md mb-10 leading-relaxed">
              Daftar hari ini dan nikmati pengalaman mencari, membeli, atau menyewa properti tanpa rasa khawatir.
            </p>
          </div>
        </div>

        {/* ─── Right: Floating Glass Auth Card (Wizard) ─── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-in fade-in slide-in-from-right-8 duration-500 ease-in-out">
          <div className="w-full max-w-lg bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_24px_64px_rgb(0,0,0,0.16)] rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            
            {/* Mobile Logo (Hidden on Desktop) */}
            <div className="lg:hidden flex justify-center mb-6">
              <Logo size="md" variant="dark" />
            </div>

            {/* Stepper Header */}
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              {currentStep > 1 ? (
                <button onClick={handlePrevStep} type="button" className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900" aria-label="Kembali ke langkah sebelumnya">
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                </button>
              ) : (
                <div className="w-9" /> // spacer
              )}
              <div className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Langkah {currentStep} dari 3
              </div>
              <div className="w-9" /> // spacer
            </div>

            <div className="mb-6 lg:mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl leading-snug font-semibold tracking-tight text-slate-900 mb-2">
                {currentStep === 1 && "Bagaimana Anda ingin menggunakan HomeLink?"}
                {currentStep === 2 && "Mari Berkenalan."}
                {currentStep === 3 && "Amankan Akses Anda."}
              </h2>
              <p className="text-sm text-slate-500">
                {currentStep === 1 && "Pilih peran yang paling sesuai untuk Anda."}
                {currentStep === 2 && "Informasi ini membantu kami mempersonalisasi pengalaman Anda."}
                {currentStep === 3 && "Buat kata sandi yang kuat untuk melindungi akun Anda."}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* ── STEP 1: ROLE ── */}
                <div className={cn("transition-all duration-300", currentStep === 1 ? "block animate-in fade-in slide-in-from-right-4" : "hidden")}>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        {ROLES.map(({ value, label, desc, icon: Icon }) => {
                          const selected = field.value === value
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => field.onChange(value)}
                              className={cn(
                                "w-full flex items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-200 text-left",
                                selected
                                  ? "border-slate-900 bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                                  : "border-white bg-white/60 hover:bg-white text-slate-600 hover:border-slate-300 shadow-sm"
                              )}
                            >
                              <div className={cn("p-3 rounded-xl", selected ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500")}>
                                <Icon className="w-6 h-6" aria-hidden="true" />
                              </div>
                              <div className="flex-1">
                                <h3 className={cn("font-semibold text-base", selected ? "text-white" : "text-slate-900")}>{label}</h3>
                                <p className={cn("text-sm", selected ? "text-slate-300" : "text-slate-500")}>{desc}</p>
                              </div>
                              <div className="w-6">
                                {selected && <CheckCircle2 className="w-6 h-6 text-white" aria-hidden="true" />}
                              </div>
                            </button>
                          )
                        })}
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />

                  {/* SSO Optional at Step 1 */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-slate-200/80" />
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">atau daftar cepat</span>
                      <div className="h-px flex-1 bg-slate-200/80" />
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl bg-white/50 border-slate-200/60 text-slate-700 shadow-sm font-medium transition-all duration-200" aria-label="Daftar dengan Google">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          <path fill="none" d="M0 0h48v48H0z"/>
                        </svg>
                        Google
                      </Button>
                    </div>
                  </div>
                </div>

                {/* ── STEP 2: IDENTITY ── */}
                <div className={cn("space-y-5 transition-all duration-300", currentStep === 2 ? "block animate-in fade-in slide-in-from-right-4" : "hidden")}>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Nama Lengkap</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                            <Input className={`${inputClass} pl-11`} placeholder="Cth: Budi Santoso" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                            <Input className={`${inputClass} pl-11`} type="email" placeholder="nama@email.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Nomor Telepon</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                            <Input className={`${inputClass} pl-11`} type="tel" placeholder="08123456789" {...field} />
                          </div>
                        </FormControl>
                        <p className="text-xs text-slate-500 ml-1 mt-1">Kami menggunakan ini untuk memverifikasi keaslian pengguna demi keamanan.</p>
                        <FormMessage className="ml-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── STEP 3: SECURITY ── */}
                <div className={cn("space-y-5 transition-all duration-300", currentStep === 3 ? "block animate-in fade-in slide-in-from-right-4" : "hidden")}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Kata Sandi</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                            <Input
                              className={`${inputClass} pl-11 pr-11`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Minimal 8 karakter"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                            </button>
                          </div>
                        </FormControl>
                        
                        {/* Smooth Strength Meter */}
                        {currentPassword && (
                          <div className="mt-2 space-y-1.5 ml-1" aria-live="polite">
                            <div className="flex gap-1 h-1.5">
                              <div className={cn("h-full flex-1 rounded-full transition-all duration-300", strengthScore >= 1 ? (strengthScore === 1 ? "bg-slate-400" : strengthScore === 2 ? "bg-blue-400" : "bg-emerald-500") : "bg-slate-200")} />
                              <div className={cn("h-full flex-1 rounded-full transition-all duration-300", strengthScore >= 2 ? (strengthScore === 2 ? "bg-blue-400" : "bg-emerald-500") : "bg-slate-200")} />
                              <div className={cn("h-full flex-1 rounded-full transition-all duration-300", strengthScore >= 3 ? "bg-emerald-500" : "bg-slate-200")} />
                            </div>
                            <p className="text-xs text-slate-500 font-medium">
                              {strengthScore === 0 && "Ketik kata sandi..."}
                              {strengthScore === 1 && "Lemah (Tambah huruf besar & angka)"}
                              {strengthScore === 2 && "Sedang (Hampir kuat)"}
                              {strengthScore === 3 && "Kuat ✓"}
                            </p>
                          </div>
                        )}
                        <FormMessage className="ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Ulangi Kata Sandi</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              className={`${inputClass} pl-11`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Ulangi kata sandi"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agreedToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2 ml-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-slate-300 rounded text-slate-900 focus:ring-slate-900"
                          />
                        </FormControl>
                        <div className="leading-snug">
                          <FormLabel className="font-normal text-sm text-slate-600 cursor-pointer">
                            Saya menyetujui{" "}
                            <Link href="/legal/terms" className="text-slate-900 hover:underline font-medium">Syarat & Ketentuan</Link>
                            {" "}serta{" "}
                            <Link href="/legal/privacy-policy" className="text-slate-900 hover:underline font-medium">Kebijakan Privasi</Link>
                            {" "}HomeLink.
                          </FormLabel>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── Action Buttons ── */}
                <div className="pt-4">
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group"
                    >
                      Selanjutnya
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memproses...</>
                      ) : (
                        "Bergabung dengan HomeLink"
                      )}
                    </Button>
                  )}
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="font-semibold text-slate-900 hover:underline transition-all">
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
