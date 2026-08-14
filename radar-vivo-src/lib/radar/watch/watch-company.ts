import type { WatchCompany } from "./types";

export function createWatchCompany(

  companyId: string,

  companyName: string,

  rvIndex: number

): WatchCompany {

  return {

    companyId,

    companyName,

    rvIndex,

    lastScan: new Date(),

  };

}