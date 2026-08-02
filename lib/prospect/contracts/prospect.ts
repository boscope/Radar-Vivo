export interface ProspectAnalysis {

  rvScore: number;

  buyingProbability: number;

  timingScore: number;

  closingProbability: number;

  estimatedTicket: number;

  priority:
    | "Muito Alta"
    | "Alta"
    | "Média"
    | "Baixa";

}
