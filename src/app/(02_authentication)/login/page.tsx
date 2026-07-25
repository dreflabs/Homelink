"use client";

import { useState, useActionState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { authenticate } from "@/lib/actions/auth";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50/50">
      <Card className="w-full max-w-[440px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] border-gray-100 bg-white">
        <CardHeader className="space-y-3 pb-6 pt-8 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Masuk
          </CardTitle>
          <CardDescription className="text-base text-gray-500">
            Selamat datang kembali di HomeLink
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form action={formAction} className="space-y-5">
            <div className="space-y-2 text-left">
              <Label htmlFor="email" className="font-semibold text-gray-700 ml-1">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                className={`h-12 rounded-[16px] px-4 bg-gray-50/50 border-gray-200 focus-visible:ring-[#4169E1] focus-visible:ring-offset-2 focus-visible:border-[#4169E1] transition-all`}
              />
            </div>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between ml-1 mr-1">
                <Label htmlFor="password" className="font-semibold text-gray-700">Password</Label>
                <Link href="#" className="text-sm text-[#4169E1] hover:text-[#3154b3] font-medium transition-colors">
                  Lupa password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className={`h-12 rounded-[16px] px-4 bg-gray-50/50 border-gray-200 focus-visible:ring-[#4169E1] focus-visible:ring-offset-2 focus-visible:border-[#4169E1] transition-all`}
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 rounded-[16px] bg-[#4169E1] hover:bg-[#3154b3] text-white font-semibold text-base transition-all shadow-[0_4px_14px_0_rgba(65,105,225,0.39)] hover:shadow-[0_6px_20px_rgba(65,105,225,0.23)] hover:-translate-y-[1px]" 
              disabled={isPending || isGoogleLoading}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-3">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-sm font-medium text-gray-400">atau masuk dengan</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 mt-6 rounded-[16px] border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-semibold text-base transition-all shadow-sm"
            onClick={handleGoogleLogin}
            disabled={isPending || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-gray-500" />
            ) : (
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="ml-1 text-[#4169E1] hover:text-[#3154b3] font-semibold transition-colors">
            Daftar sekarang
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
