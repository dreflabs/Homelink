"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, SendHorizontal, MailCheck, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { forgotPassword } from "@/actions/auth";

const emailSchema = z.object({
  identifier: z.string().min(1, "Email wajib diisi.").email("Masukkan alamat email yang valid."),
  mode: z.literal("email"),
});

const phoneSchema = z.object({
  identifier: z
    .string()
    .min(1, "Nomor telepon wajib diisi.")
    .regex(/^(\+62|0)[0-9]{9,13}$/, "Masukkan nomor telepon yang valid (mis: 0812... atau +62...)."),
  mode: z.literal("phone"),
});

const forgotPasswordSchema = z.discriminatedUnion("mode", [emailSchema, phoneSchema]);

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<"email" | "phone">("email");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      mode: "email",
      identifier: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setErrorMsg(null);
    try {
      if (data.mode === "phone") {
        setErrorMsg("Reset via phone is currently not supported.");
        return;
      }
      const res = await forgotPassword(data.identifier);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSubmitted(true);
      }
    } catch (e) {
      setErrorMsg("An unexpected error occurred.");
    }
  };

  const handleTabChange = (value: string) => {
    const newMode = value as "email" | "phone";
    setMode(newMode);
    setValue("mode", newMode);
    // Optional: clear errors or reset identifier field on switch
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MailCheck className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Instruksi Terkirim</h1>
            <p className="text-slate-500">
              Jika akun tersebut terdaftar, kami telah mengirimkan instruksi pemulihan. Silakan periksa kotak masuk atau pesan Anda.
            </p>
          </div>
          <Alert className="bg-slate-50 border-none text-left mt-6">
            <AlertDescription className="text-slate-600 text-sm">
              Tidak menerima pesan? Periksa folder spam atau pastikan nomor/email yang Anda masukkan benar.
            </AlertDescription>
          </Alert>
          <Button asChild className="w-full mt-6" variant="default">
            <Link href="/login">Kembali ke Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lupa Password?</h1>
          <p className="text-sm text-slate-500">
            Jangan khawatir, kami akan bantu Anda mengakses kembali akun Anda.
          </p>
        </div>

        <Tabs defaultValue="email" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Nomor Telepon</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier">
                {mode === "email" ? "Alamat Email" : "Nomor Telepon"}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  {mode === "email" ? (
                    <Mail className="h-5 w-5" />
                  ) : (
                    <Phone className="h-5 w-5" />
                  )}
                </div>
                <Input
                  id="identifier"
                  type={mode === "email" ? "email" : "tel"}
                  placeholder={
                    mode === "email"
                      ? "nama@perusahaan.com"
                      : "081234567890"
                  }
                  className="pl-10"
                  {...register("identifier")}
                  aria-invalid={!!errors.identifier}
                />
              </div>
              {errors.identifier && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {errorMsg && (
              <Alert variant="destructive">
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Kirim Instruksi Reset
                </>
              )}
            </Button>
          </form>
        </Tabs>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}
