"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function ConfirmPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setStatus("error");
            setMessage(error.message);
          } else {
            setStatus("success");
            setMessage("Email confirmado! Redirecionando...");
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 2000);
          }
        });
    } else {
      setStatus("error");
      setMessage("Link de confirmação inválido ou expirado.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-neutral-400">Confirmando email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-6xl mb-4">✅</div>
            <p className="text-green-400 font-semibold">{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <p className="text-red-400 font-semibold">{message}</p>
            <Link
              href="/auth/login"
              className="inline-block mt-4 text-green-400 hover:underline text-sm"
            >
              Voltar para o login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
