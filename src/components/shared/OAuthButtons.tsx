"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<"google" | "apple" | null>(null);

  const handleOAuth = (provider: "google" | "apple") => {
    setIsLoading(provider);
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        className="w-full relative"
        onClick={() => handleOAuth("google")}
        disabled={isLoading !== null}
      >
        {isLoading === "google" ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-slate-600 border-t-transparent rounded-full" />
        ) : (
          <svg className="w-5 h-5 mr-2 absolute left-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        )}
        Lanjutkan dengan Google
      </Button>

      <Button
        variant="outline"
        className="w-full relative"
        onClick={() => handleOAuth("apple")}
        disabled={isLoading !== null}
      >
        {isLoading === "apple" ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-slate-600 border-t-transparent rounded-full" />
        ) : (
          <svg className="w-5 h-5 mr-2 absolute left-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05 1.8-3.08 1.8-1.09 0-1.44-.66-2.67-.66-1.25 0-1.64.64-2.65.64-1.05 0-2.03-.81-3.08-1.8C3.39 17.9 2.17 14.28 3.51 11.5c.67-1.37 1.95-2.25 3.36-2.27 1.05-.02 2.05.71 2.7.71.65 0 1.86-.85 3.12-.72 1.34.05 2.53.51 3.35 1.5-3.11 1.86-2.58 6.3 1.01 7.56-.7 1.77-1.6 3.52-3.08 4.95zM12.03 7.25c-.15-1.57.55-3.07 1.54-3.95 1.02-1.02 2.45-1.57 3.95-1.4-.23 1.63-.98 3.14-2.05 4.12-1 1-2.45 1.57-3.95 1.39a3.9 3.9 0 0 1 .51-.16z" />
          </svg>
        )}
        Lanjutkan dengan Apple
      </Button>
    </div>
  );
}
