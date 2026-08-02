export interface WatchCompany {

  companyId: string;

  companyName: string;

  lastScan: Date;

  rvIndex: number;

}

export interface WatchAlert {

  companyId: string;

  title: string;

  description: string;

  priority: "Baixa" | "Média" | "Alta" | "Urgente";

  createdAt: Date;

}