export interface MonitorCompany {

  companyId: string;

  companyName: string;

  lastScan: Date;

  nextScan: Date;

  active: boolean;

}

export interface MonitorEvent {

  id: string;

  companyId: string;

  type: string;

  description: string;

  createdAt: Date;

}

export interface MonitorHistory {

  companyId: string;

  events: MonitorEvent[];

}
