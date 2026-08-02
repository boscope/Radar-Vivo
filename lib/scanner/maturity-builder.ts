import type {
  RadarReport,
} from "@/lib/intelligence";

export interface Maturity {

  digital: number;

  marketing: number;

  automation: number;

}

export function buildMaturity(
  report: RadarReport
): Maturity {

  return {

    digital:
      report.analysis.website ? 100 : 25,

    marketing:
      report.analysis.hasGoogleAds ||
      report.analysis.hasMetaAds
        ? 80
        : 20,

    automation:
      report.analysis.hasAutomation
        ? 100
        : 10,

  };

}
