export interface ScanLog {

  company: string;

  startedAt: Date;

  finishedAt: Date;

  success: boolean;

}

export function createScanLog(

  company: string,

  success: boolean

): ScanLog {

  const now = new Date();

  return {

    company,

    startedAt: now,

    finishedAt: now,

    success,

  };

}
