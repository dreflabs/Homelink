"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
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
import { Loader2, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const registerSchema = z.object({
  role: z.enum(["BUYER", "OWNER", "SURVEYOR"], { message: "Peran harus dipilih" }),
  fullName: z.string().min(2, "Nama lengkap harus minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phoneNumber: z.string().regex(/^(\+62|0)[0-9]{9,13}$/, "Nomor telepon tidak valid (Contoh: 0812... atau +62812...)"),
  password: z.string().regex(passwordRegex, "Password minimal 8 karakter, 1 huruf besar, dan 1 angka"),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui Syarat dan Ketentuan",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan Konfirmasi Password tidak cocok",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
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
        toast.success("Registrasi berhasil!", {
          description: result.message || "Silakan periksa email Anda untuk verifikasi.",
        });
        router.push("/verify-email");
      } else {
        // Handle server side validation errors mapping back to form
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            if (key === 'email' || key === 'phone' || key === 'name' || key === 'password' || key === 'role') {
              const formKey = key === 'name' ? 'fullName' : key === 'phone' ? 'phoneNumber' : key;
              form.setError(formKey as any, { type: 'server', message: result.errors[key][0] });
            }
          });
          toast.error("Gagal melakukan registrasi", {
            description: "Silakan periksa kembali data yang Anda masukkan.",
          });
        } else {
          toast.error("Gagal", {
            description: result.message || "Terjadi kesalahan saat registrasi",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Kesalahan Jaringan", {
        description: "Tidak dapat terhubung ke server. Silakan coba lagi.",
      });
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peran (Role)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih peran Anda" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BUYER">Pembeli (Buyer)</SelectItem>
                        <SelectItem value="OWNER">Pemilik (Owner)</SelectItem>
                        <SelectItem value="SURVEYOR">Surveyor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="h-10 pl-9" placeholder="Masukkan nama lengkap Anda" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="h-10 pl-9" type="email" placeholder="nama@email.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="h-10 pl-9" type="tel" placeholder="08123456789" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="h-10 pl-9 pr-10" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Minimal 8 karakter" 
                          {...field} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="h-10 pl-9 pr-10" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Masukkan ulang password Anda" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreedToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal text-sm text-muted-foreground">
                        Saya setuju dengan{" "}
                        <Link href="/terms" className="text-primary hover:underline">Syarat & Ketentuan</Link>
                        {" "}serta{" "}
                        <Link href="/privacy" className="text-primary hover:underline">Kebijakan Privasi</Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {form.formState.errors.agreedToTerms && (
                <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.agreedToTerms.message}</p>
              )}

              <Button type="submit" className="w-full h-10 font-semibold mt-4 transition-all" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Daftar Sekarang"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-muted"></div>
            <span className="mx-2 text-xs text-muted-foreground uppercase bg-background px-2">atau</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-10 w-full" type="button">
              Google
            </Button>
            <Button variant="outline" className="h-10 w-full" type="button">
              Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6 text-sm text-muted-foreground bg-muted/10 rounded-b-xl">
          Sudah punya akun?{" "}
          <Link href="/login" className="ml-1 font-semibold text-primary hover:underline transition-colors">
            Masuk di sini
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
