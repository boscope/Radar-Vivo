import type {
  CompanyAnalysis,
  IntelligenceResult,
} from "./types";

import { buildScore } from "./build-score";
import { buildDiagnosis } from "./build-diagnosis";
import { buildCommercial } from "./build-commercial";
import { buildReport } from "./build-report";
import { buildAiPresence } from "./build-ai-presence";

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
  // Presença em IAs
  //--------------------------------------------------

  const aiPresence = buildAiPresence(analysis);

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

    aiPresence,

    report,

  };

}