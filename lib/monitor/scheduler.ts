import type {
  MonitorCompany,
} from "./types";

export function scheduleNextScan(
  company: MonitorCompany
): Date {

  const next = new Date();

  next.setDate(
    next.getDate() + 7
  );

  return next;

}
