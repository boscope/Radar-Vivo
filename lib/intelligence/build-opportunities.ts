import type {
  CompanyAnalysis,
  Opportunity,
} from "./types";

export function buildOpportunities(
  company: CompanyAnalysis
): Opportunity[] {

  const opportunities: Opportunity[] = [];

  //--------------------------------------------------
  // Website
  //--------------------------------------------------

  if (!company.website) {

    opportunities.push({

      title: "Criação de Website",

      description:
        "A empresa ainda não possui um site profissional, reduzindo sua autoridade e conversão.",

      impact: 95,

    });

  }

  //--------------------------------------------------
  // SEO
  //--------------------------------------------------

  if (!company.hasSeo) {

    opportunities.push({

      title: "SEO Local",

      description:
        "Existe grande potencial para aumentar a presença da empresa nas pesquisas do Google.",

      impact: 90,

    });

  }

  //--------------------------------------------------
  // Automação
  //--------------------------------------------------

  if (!company.hasAutomation) {

    opportunities.push({

      title: "Automação Comercial",

      description:
        "A empresa pode reduzir tempo de atendimento e aumentar conversões com automação.",

      impact: 88,

    });

  }

  //--------------------------------------------------
  // Google Ads
  //--------------------------------------------------

  if (!company.hasGoogleAds) {

    opportunities.push({

      title: "Google Ads",

      description:
        "Campanhas patrocinadas podem acelerar a aquisição de novos clientes.",

      impact: 82,

    });

  }

  //--------------------------------------------------
  // Meta Ads
  //--------------------------------------------------

  if (!company.hasMetaAds) {

    opportunities.push({

      title: "Meta Ads",

      description:
        "Anúncios nas redes sociais podem ampliar significativamente o alcance da empresa.",

      impact: 80,

    });

  }

  //--------------------------------------------------
  // Google Business
  //--------------------------------------------------

  if (!company.googleBusiness) {

    opportunities.push({

      title: "Google Business",

      description:
        "Cadastrar e otimizar o perfil no Google aumenta a visibilidade local.",

      impact: 85,

    });

  }

  //--------------------------------------------------
  // Instagram
  //--------------------------------------------------

  if (!company.instagram) {

    opportunities.push({

      title: "Instagram Profissional",

      description:
        "A presença ativa no Instagram fortalece autoridade e relacionamento com clientes.",

      impact: 70,

    });

  }

  //--------------------------------------------------
  // Facebook
  //--------------------------------------------------

  if (!company.facebook) {

    opportunities.push({

      title: "Facebook Business",

      description:
        "Uma página profissional aumenta a confiança e amplia canais de divulgação.",

      impact: 60,

    });

  }

  opportunities.sort((a, b) => b.impact - a.impact);

  return opportunities;

}