import HeroSearch from "@/components/landing/HeroSearch";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import ProductPreview from "@/components/landing/ProductPreview";
import Pricing from "@/components/landing/Pricing";
import SocialProof from "@/components/landing/SocialProof";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import RadarVisual from "@/components/landing/RadarVisual";
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

    <main className="bg-black text-white">

      <section className="bg-black text-white relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-green-500/5"></div>

          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-green-500/10"></div>

          <div className="absolute top-20 right-10 w-3 h-3 rounded-full bg-green-500/40"></div>

          <div className="absolute top-40 right-40 w-2 h-2 rounded-full bg-green-500/30"></div>

          <div className="absolute bottom-20 right-24 w-2 h-2 rounded-full bg-green-500/25"></div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 hidden md:block">

            <RadarVisual side="left" />

          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 hidden md:block">

            <RadarVisual side="right" />

          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

            <span className="inline-block px-4 py-2 rounded-full bg-neutral-900 border border-green-500/30 text-sm text-green-400">

              📡 Radar Vivo — Fluxo Previsível e Constante de Novas Oportunidades.

            </span>

            <h1 className="mt-6 text-3xl md:text-4xl font-extrabold leading-snug max-w-3xl mx-auto">

              Encontre Empresas Prontas antes da concorrência — e transforme oportunidades escondidas em novos clientes todos os meses.

            </h1>

            <p className="mt-5 text-lg text-neutral-400 max-w-2xl mx-auto">

              O Radar Vivo encontra negócios locais com presença digital fraca,
              mostra exatamente o que falta (site, WhatsApp, presença no Google),
              gera o script de abordagem pronto e acompanha a venda até fechar.

            </p>

            <div className="flex justify-center">

              <HeroSearch />

            </div>

            <div className="mt-8 flex gap-4 flex-wrap justify-center">

              <a

                href="/busca"

                className="bg-green-500 hover:bg-green-400 transition text-black px-8 py-4 rounded-xl font-bold"

              >

                🎯 Buscar oportunidades agora

              </a>

              <a

                href="/scanner"

                className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-neutral-800 transition border border-neutral-700"

              >

                Analisar uma empresa

              </a>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto">

              <div>

                <p className="text-4xl font-extrabold text-green-400">
                  {totalEmpresas}
                </p>

                <p className="text-neutral-500 mt-1 text-sm">
                  Empresas analisadas
                </p>

              </div>

              <div>

                <p className="text-4xl font-extrabold text-green-400">
                  {totalOportunidades}
                </p>

                <p className="text-neutral-500 mt-1 text-sm">
                  Oportunidades mapeadas
                </p>

              </div>

              <div>

                <p className="text-4xl font-extrabold text-green-400">
                  {totalLeads}
                </p>

                <p className="text-neutral-500 mt-1 text-sm">
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

      <Footer />

    </main>

  );

}
