import type {
  RadarReport,
  CompanyAnalysis,
  RadarScore,
  Diagnosis,
  CommercialRecommendation,
} from "./types";

interface BuildReportInput {

  analysis: CompanyAnalysis;

  score: RadarScore;

  diagnosis: Diagnosis;

  commercial: CommercialRecommendation;

}

export function buildReport({
  analysis,
  score,
  diagnosis,
  commercial,
}: BuildReportInput): RadarReport {

  return {

    analysis,

    score,

    diagnosis,

    commercial,

  };

}