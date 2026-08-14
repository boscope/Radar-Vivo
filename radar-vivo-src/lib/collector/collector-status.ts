export interface CollectorStatus {

  version: string;

  collectors: string[];

}

export function collectorStatus():
CollectorStatus {

  return {

    version: "1.0.0",

    collectors: [

      "google",

      "website",

      "social",

      "contact",

      "technology",

      "domain",

      "performance",

      "maps",

      "reputation",

      "business",

    ],

  };

}
