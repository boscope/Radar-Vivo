import type {

  WatchCompany,

  WatchAlert,

} from "./types";

export function executeWatch(

  company: WatchCompany

): WatchAlert[] {

  const alerts: WatchAlert[] = [];

  if (company.rvIndex >= 90) {

    alerts.push({

      companyId: company.companyId,

      title: "Oportunidade Muito Alta",

      description:

        "Empresa precisa ser abordada imediatamente.",

      priority: "Urgente",

      createdAt: new Date(),

    });

  }

  return alerts;

}