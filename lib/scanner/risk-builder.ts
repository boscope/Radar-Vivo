import type {
  RadarReport,
} from "@/lib/intelligence";

export interface ScannerRisk {

  score: number;

  level: string;

}

export function buildScannerRisk(
  report: RadarReport
): ScannerRisk {

  let score = 0;

  if (!report.analysis.website)
    score += 30;

  if (!report.analysis.hasSeo)
    score += 25;

  if (!report.analysis.hasAutomation)
    score += 20;

  if (!report.analysis.hasGoogleAds)
    score += 15;

  if (!report.analysis.hasMetaAds)
    score += 10;

  let level = "Baixo";

  if (score >= 70)
    level = "Alto";
  else if (score >= 40)
    level = "Médio";

  return {

    score,

    level,

  };

}
