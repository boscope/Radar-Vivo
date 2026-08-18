import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-bold">
              <span className="text-green-400">Radar</span>
              <span className="text-white">Vivo</span>
            </Link>
            <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
              Plataforma de inteligência comercial para agências que vendem presença digital a negócios locais.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Produto</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#como-funciona" className="hover:text-green-400 transition">Como funciona</a></li>
              <li><a href="#precos" className="hover:text-green-400 transition">Preços</a></li>
              <li><Link href="/busca" className="hover:text-green-400 transition">Testar agora</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/privacidade" className="hover:text-green-400 transition">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-green-400 transition">Termos de Uso</Link></li>
              <li><Link href="/contato" className="hover:text-green-400 transition">Contato</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
            <span>CNPJ: 27.277.654/0001-13</span>
            <span className="hidden md:inline">·</span>
            <span>Londrina/PR, Brasil</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5 border border-neutral-700 rounded-md px-2.5 py-1.5">
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19L3.36 21.8C5.578 22.926 8.562 24 12.165 24c2.633 0 4.807-.656 6.309-1.878 1.658-1.338 2.487-3.295 2.487-5.687 0-4.108-2.524-5.811-6.985-7.285z"/>
              </svg>
              <span>Pagamento seguro via <strong className="text-white">Stripe</strong></span>
            </div>

            <div className="flex items-center gap-1.5 border border-neutral-700 rounded-md px-2.5 py-1.5">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Conforme <strong className="text-white">LGPD</strong></span>
            </div>
          </div>
        </div>

        <p className="text-center text-neutral-600 text-xs mt-6">
          © {new Date().getFullYear()} Radar Vivo. Todos os direitos reservados. Cancele quando quiser.
        </p>
      </div>
    </footer>
  );
}
