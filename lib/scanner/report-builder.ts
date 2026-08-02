import type {
  RadarReport,
} from "@/lib/intelligence";

export interface ScannerReport {

  company: string;

  city: string;

  category: string;

  rvIndex: number;

  priority: string;

  estimatedRevenue: number;

  estimatedTicket: number;

  recommendedServices: string[];

  strengths: string[];

  weaknesses: string[];

  opportunities: string[];

  firstApproach: string;

}

export function buildScannerReport(
  report: RadarReport
): ScannerReport {

  return {

    company:
      report.analysis.companyName,

    city:
      report.analysis.city,

    category:
      report.analysis.category,

    rvIndex:
      report.score.score,

    priority:
      report.score.priority,

    estimatedRevenue:
      report.score.estimatedRevenue,

    estimatedTicket:
      report.commercial.estimatedTicket,

    recommendedServices:
      report.commercial.recommendedServices,

    strengths:
      report.diagnosis.strengths,

    weaknesses:
      report.diagnosis.weaknesses,

    opportunities:

      report.diagnosis.opportunities.map(

        item => item.title

      ),

    firstApproach:
      report.commercial.firstApproach,

  };

}
