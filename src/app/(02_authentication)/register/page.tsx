"use client"

import * as React from "react"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

const registerSchema = z.object({
  role: z.enum(["BUYER", "OWNER"], { required_error: "Peran harus dipilih" }),
  fullName: z.string().min(2, "Nama lengkap harus minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan Konfirmasi Password tidak cocok",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "BUYER",
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Form submitted:", data)
    // Simulasi proses registrasi
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert("Registrasi berhasil (Simulasi)")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4 md:p-8">
      <Card className="w-full max-w-md shadow-xl border-muted/50 bg-background/60 backdrop-blur-md">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">Daftar Akun Baru</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Bergabunglah dengan HomeLink untuk mencari atau mendaftarkan properti impian Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Peran (Role)</label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih peran Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUYER">Pembeli (Buyer)</SelectItem>
                      <SelectItem value="OWNER">Pemilik (Owner)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
              <Input className="h-10" placeholder="Masukkan nama lengkap Anda" {...register("fullName")} />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input className="h-10" type="email" placeholder="nama@email.com" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Nomor Telepon</label>
              <Input className="h-10" type="tel" placeholder="+62..." {...register("phoneNumber")} />
              {errors.phoneNumber && <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input className="h-10" type="password" placeholder="Minimal 8 karakter" {...register("password")} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Konfirmasi Password</label>
              <Input className="h-10" type="password" placeholder="Masukkan ulang password Anda" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full h-10 font-semibold mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6 text-sm text-muted-foreground bg-muted/10">
          Sudah punya akun?{" "}
          <Link href="/login" className="ml-1 font-semibold text-primary hover:underline">
            Masuk di sini
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
