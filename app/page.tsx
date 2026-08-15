import HeroSearch from "@/components/landing/HeroSearch";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import ProductPreview from "@/components/landing/ProductPreview";
import Pricing from "@/components/landing/Pricing";
import SocialProof from "@/components/landing/SocialProof";
import FinalCTA from "@/components/landing/FinalCTA";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  let totalEmpresas = 0;

  let totalOportunidades = 0;

  let totalLeads = 0;

  try {

    const [{ count: empresas }, { count: leads }] = await Promise.all([
      supabase.from("companies").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
    ]);

    totalEmpresas = empresas ?? 0;

    totalLeads = leads ?? 0;

  } catch {

    totalEmpresas = 0;

    totalLeads = 0;

  }

  totalOportunidades = totalEmpresas;

  return (

    <main className="bg-slate-950 text-white">

      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <span className="inline-block px-4 py-2 rounded-full bg-slate-800 text-sm">

            Feito para agências que vendem sites e marketing

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">

            Encontre empresas sem site e feche mais vendas todos os meses.

          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl">

            O Radar Vivo encontra negócios locais com presença digital fraca,
            mostra exatamente o que falta (site, WhatsApp, presença no Google),
            gera o script de abordagem pronto e acompanha a venda até fechar.

          </p>

          <HeroSearch />

          <div className="mt-12 flex gap-5 flex-wrap">

            <a

              href="/busca"

              className="bg-green-500 hover:bg-green-400 transition text-black px-8 py-4 rounded-xl font-bold"

            >

              🎯 Buscar oportunidades agora

            </a>

            <a

              href="/scanner"

              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition"

            >

              Analisar uma empresa

            </a>

          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">

            <div>

              <p className="text-4xl font-extrabold text-green-400">
                {totalEmpresas}
              </p>

              <p className="text-slate-400 mt-1 text-sm">
                Empresas analisadas
              </p>

            </div>

            <div>

              <p className="text-4xl font-extrabold text-green-400">
                {totalOportunidades}
              </p>

              <p className="text-slate-400 mt-1 text-sm">
                Oportunidades mapeadas
              </p>

            </div>

            <div>

              <p className="text-4xl font-extrabold text-green-400">
                {totalLeads}
              </p>

              <p className="text-slate-400 mt-1 text-sm">
                Leads no pipeline
              </p>

            </div>

          </div>

        </div>

      </section>

      <HowItWorks />

      <Benefits />

      <ProductPreview />

      <SocialProof />

      <Pricing />

      <FinalCTA />

    </main>

  );

}
