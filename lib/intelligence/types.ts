import type { AiPresence } from "./build-ai-presence";

export interface CompanyAnalysis {

  companyName: string;

  city: string;

  category: string;

  website?: string;

  googleBusiness?: boolean;

  instagram?: string;

  facebook?: string;

  hasWhatsapp?: boolean;

  hasSeo?: boolean;

  hasGoogleAds?: boolean;

  hasMetaAds?: boolean;

  hasAutomation?: boolean;

  automationTool?: string;

}

export interface RadarScore {

  score: number;

  priority:
    | "Muito Alta"
    | "Alta"
    | "Média"
    | "Baixa";

  closingProbability: number;

  estimatedRevenue: number;

}

export interface Opportunity {

  title: string;

  description: string;

  impact: number;

}

export interface Diagnosis {

  strengths: string[];

  weaknesses: string[];

  opportunities: Opportunity[];

}

export interface CommercialRecommendation {

  recommendedServices: string[];

  firstApproach: string;

  estimatedTicket: number;

}

export interface RadarReport {

  analysis: CompanyAnalysis;

  score: RadarScore;

  diagnosis: Diagnosis;

  commercial: CommercialRecommendation;

}

export interface IntelligenceResult {

  score: RadarScore;

  diagnosis: Diagnosis;

  commercial: CommercialRecommendation;

  aiPresence: AiPresence;

  report: RadarReport;

}