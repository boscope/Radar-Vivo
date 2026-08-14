import type {
  RadarReport,
} from "@/lib/intelligence";

export interface MonitorOpportunity {

  id: string;

  title: string;

  impact: number;

  createdAt: Date;

}

export function monitorOpportunities(
  report: RadarReport
): MonitorOpportunity[] {

  return report.diagnosis.opportunities.map(

    (item, index) => ({

      id: `OP-${index + 1}`,

      title: item.title,

      impact: item.impact,

      createdAt: new Date(),

    })

  );

}
