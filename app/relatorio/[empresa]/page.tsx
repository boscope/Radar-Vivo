import type { Metadata } from "next";
import RelatorioPublicoClient from "./client";

type Props = {
  params: Promise<{ empresa: string }>;
  searchParams: Promise<{ city?: string; state?: string; category?: string }>;
};

function slugToName(slug: string): string {
  return decodeURIComponent(slug).replace(/[-_]/g, " ");
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { empresa } = await params;
  const { city, state } = await searchParams;

  const name = slugToName(empresa);
  const onde = [city, state].filter(Boolean).join(", ");
  const titulo = `${name}${onde ? ` - ${onde}` : ""} | Radar Vivo`;

  return {
    title: titulo,
    description: `Análise de presença digital de ${name}${onde ? ` em ${onde}` : ""}: avaliação gratuita de site, SEO, Google Business, Instagram e WhatsApp com score inteligente.`,
    openGraph: {
      title: titulo,
      description: `Veja o score de presença digital de ${name}${onde ? ` em ${onde}` : ""} e descubra oportunidades de crescimento.`,
      type: "website",
      locale: "pt_BR",
    },
  };
}

export default function RelatorioPage(props: Props) {
  return <RelatorioPublicoClient params={props.params} />;
}
