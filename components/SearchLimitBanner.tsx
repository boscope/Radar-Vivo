"use client";

import Link from "next/link";

type Props = {
  remaining: number;
  isLogged?: boolean;
};

export default function SearchLimitBanner({ remaining, isLogged }: Props) {
  if (isLogged) return null;
  if (remaining > 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-white mb-2">
          Busca grátis utilizada
        </h2>
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
          Você usou sua <strong>1 busca grátis</strong>. Assine agora e tenha{" "}
          <strong className="text-green-400">buscas ilimitadas</strong> para
          fechar mais vendas.
        </p>

        <Link
          href="/auth/cadastro?plan=pro"
          className="block w-full bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg px-4 py-3 transition mb-3"
        >
          Assinar agora
        </Link>

        <Link
          href="/auth/login"
          className="block text-neutral-400 hover:text-white text-sm transition"
        >
          Já tenho conta
        </Link>
      </div>
    </div>
  );
}
