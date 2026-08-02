import type {
  MonitorCompany,
} from "./types";

export function createMonitorCompany(

  companyId: string,

  companyName: string

): MonitorCompany {

  const now = new Date();

  const next = new Date(now);

  next.setDate(next.getDate() + 7);

  return {

    companyId,

    companyName,

    lastScan: now,

    nextScan: next,

    active: true,

  };

}
