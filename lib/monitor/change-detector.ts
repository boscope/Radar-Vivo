import type {
  CompanyAnalysis,
} from "@/lib/intelligence";

export interface Change {

  field: string;

  before: unknown;

  after: unknown;

}

export function detectChanges(

  previous: CompanyAnalysis,

  current: CompanyAnalysis

): Change[] {

  const changes: Change[] = [];

  const fields: (keyof CompanyAnalysis)[] = [

    "website",

    "instagram",

    "facebook",

    "hasSeo",

    "hasGoogleAds",

    "hasMetaAds",

    "hasAutomation",

    "hasWhatsapp",

  ];

  for (const field of fields) {

    if (previous[field] !== current[field]) {

      changes.push({

        field,

        before: previous[field],

        after: current[field],

      });

    }

  }

  return changes;

}
