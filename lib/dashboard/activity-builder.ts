import type {
  DashboardActivity,
} from "./types";

export function buildActivities():
DashboardActivity[] {

  return [

    {

      id: "1",

      company: "Empresa Exemplo",

      action: "Análise realizada",

      createdAt: new Date(),

    },

  ];

}
