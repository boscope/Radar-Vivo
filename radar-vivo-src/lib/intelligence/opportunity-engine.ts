import type {
  CompanyAnalysis,
  Opportunity,
} from "./types";

export function detectOpportunities(
  analysis: CompanyAnalysis
): Opportunity[] {

  const opportunities: Opportunity[] = [];

  if (!analysis.website) {

    opportunities.push({

      title: "Novo Site Profissional",

      description:
        "Empresa sem presença digital própria.",

      impact: 95,

    });

  }

  if (!analysis.hasSeo) {

    opportunities.push({

      title: "SEO Local",

      description:
        "Empresa não aparece corretamente nas buscas.",

      impact: 90,

    });

  }

  if (!analysis.hasAutomation) {

    opportunities.push({

      title: "Automação de WhatsApp",

      description:
        "Grande potencial de ganho operacional.",

      impact: 88,

    });

  }

  if (!analysis.hasGoogleAds) {

    opportunities.push({

      title: "Google Ads",

      description:
        "Possibilidade de geração imediata de leads.",

      impact: 82,

    });

  }

  if (!analysis.hasMetaAds) {

    opportunities.push({

      title: "Meta Ads",

      description:
        "Aumentar alcance nas redes sociais.",

      impact: 78,

    });

  }

  return opportunities.sort(

    (a, b) => b.impact - a.impact

  );

}
