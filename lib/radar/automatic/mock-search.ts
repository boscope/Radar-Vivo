import type { Opportunity } from "./types";

export function getMockCompanies(): Opportunity[] {

  return [

    {
      id: "1",
      company: "Clínica Vida",
      city: "Londrina",
      category: "Clínica",
      source: "Radar Vivo",
      discoveredAt: new Date(),
    },

    {
      id: "2",
      company: "Odonto Prime",
      city: "Londrina",
      category: "Odontologia",
      source: "Radar Vivo",
      discoveredAt: new Date(),
    },

    {
      id: "3",
      company: "Academia Alpha",
      city: "Londrina",
      category: "Academia",
      source: "Radar Vivo",
      discoveredAt: new Date(),
    },

  ];

}