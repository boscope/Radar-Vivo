export interface CommercialAnalysis {
  probability: number;

  potential:
    | "Baixo"
    | "Médio"
    | "Alto";

  priority:
    | "Baixa"
    | "Média"
    | "Alta";

  recommendedServices: string[];

  arguments: string[];

  nextAction: string;
}
