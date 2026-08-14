import type { CompanyData } from "./types";

export interface BusinessData {

  estimatedEmployees?: number;

  estimatedRevenue?: number;

  maturityLevel:
    | "Inicial"
    | "Crescimento"
    | "Consolidada";

}

export async function collectBusiness(
  company: CompanyData
): Promise<BusinessData> {

  return {

    estimatedEmployees: undefined,

    estimatedRevenue: undefined,

    maturityLevel: "Crescimento",

  };

}
