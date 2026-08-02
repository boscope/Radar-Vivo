import type {
  CompanyAnalysis,
  IntelligenceResult,
} from "./types";

import { buildScore } from "./build-score";
import { buildDiagnosis } from "./build-diagnosis";
import { buildCommercial } from "./build-commercial";
import { buildReport } from "./build-report";

export function analyzeCompany(
  analysis: CompanyAnalysis
): IntelligenceResult {

  //--------------------------------------------------
  // Score
  //--------------------------------------------------

  const score = buildScore(analysis);

  //--------------------------------------------------
  // Diagnóstico
  //--------------------------------------------------

  const diagnosis = buildDiagnosis(
    analysis,
    score
  );

  //--------------------------------------------------
  // Comercial
  //--------------------------------------------------

  const commercial = buildCommercial(
    analysis,
    score,
    diagnosis
  );

  //--------------------------------------------------
  // Relatório
  //--------------------------------------------------

  const report = buildReport({

    analysis,

    score,

    diagnosis,

    commercial,

  });

  //--------------------------------------------------

  return {

    score,

    diagnosis,

    commercial,

    report,

  };

}