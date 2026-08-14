import type {
  DashboardCard,
  DashboardMetrics,
} from "./types";

export function buildCards(
  metrics: DashboardMetrics
): DashboardCard[] {

  return [

    {

      title: "Empresas",

      value: metrics.companies.toString(),

      description: "Empresas cadastradas",

    },

    {

      title: "Oportunidades",

      value: metrics.opportunities.toString(),

      description: "Detectadas",

    },

    {

      title: "Monitoradas",

      value: metrics.monitored.toString(),

      description: "Em acompanhamento",

    },

    {

      title: "RV Médio",

      value: metrics.averageScore.toString(),

      description: "Índice Radar Vivo",

    },

  ];

}
