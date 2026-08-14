import type {
  CompanyAnalysis,
} from "./types";

export interface Rule {

  id: string;

  matched: boolean;

  weight: number;

}

export function evaluateRules(
  analysis: CompanyAnalysis
): Rule[] {

  return [

    {

      id: "NO_WEBSITE",

      matched: !analysis.website,

      weight: 25,

    },

    {

      id: "NO_SEO",

      matched: !analysis.hasSeo,

      weight: 20,

    },

    {

      id: "NO_AUTOMATION",

      matched: !analysis.hasAutomation,

      weight: 20,

    },

    {

      id: "NO_GOOGLE_ADS",

      matched: !analysis.hasGoogleAds,

      weight: 15,

    },

    {

      id: "NO_META_ADS",

      matched: !analysis.hasMetaAds,

      weight: 10,

    },

    {

      id: "HAS_WHATSAPP",

      matched: analysis.hasWhatsapp ?? false,

      weight: 10,

    },

  ];

}
