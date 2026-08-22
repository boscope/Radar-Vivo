"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function CadastroForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        await fetch("/api/user/ensure-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.user.id,
            email,
            fullName,
          }),
        });
      } catch (e) {
        console.error("[CADASTRO] ensure-profile error:", e);
      }

      localStorage.removeItem("rv_free_searches");

      if (plan === "pro" || plan === "agency") {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          try {
            const res = await fetch("/api/stripe/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                plan,
                userId: session.user.id,
                email: session.user.email,
              }),
            });
            const checkoutData = await res.json();
            if (checkoutData.url) {
              window.location.href = checkoutData.url;
              return;
            }
          } catch {
            console.error("[CADASTRO] checkout error");
          }
        }
      }

      window.location.href = "/";
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-xl font-bold text-white mb-2">Conta criada!</h1>
          <p className="text-neutral-400 text-sm mb-6">
            Verifique seu email para confirmar sua conta.
          </p>
          <Link
            href="/auth/login"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg px-6 py-3 transition"
          >
            Ir para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <Image
              src="/logo-512.png"
              alt="Radar Vivo"
              width={72}
              height={72}
              className="rounded-2xl mx-auto"
              priority
            />
          </Link>
          <Link href="/" className="text-2xl font-bold">
            <span className="text-green-400">Radar</span>
            <span className="text-white">Vivo</span>
          </Link>
          <h1 className="text-xl font-semibold text-white mt-4">
            {plan === "pro" || plan === "agency"
              ? `Assinar plano ${plan === "pro" ? "Pro" : "Agência"}`
              : "Crie sua conta"}
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            {plan === "pro" || plan === "agency"
              ? "Crie sua conta para prosseguir com a assinatura"
              : "Teste grátis por 3 dias, sem cartão de crédito"}
          </p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-green-500 transition"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <div className="text-xs text-neutral-500">
            Ao criar sua conta, você concorda com nossos{" "}
            <Link href="/termos" className="text-green-400 hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacidade" className="text-green-400 hover:underline">
              Política de Privacidade
            </Link>
            .
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg px-4 py-3 transition disabled:opacity-50"
          >
            {loading
              ? "Criando conta..."
              : plan === "pro" || plan === "agency"
              ? "Criar conta e assinar"
              : "Começar teste grátis"}
          </button>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Já tem uma conta?{" "}
          <Link
            href="/auth/login"
            className="text-green-400 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
        </div>
      }
    >
      <CadastroForm />
    </Suspense>
  );
}
