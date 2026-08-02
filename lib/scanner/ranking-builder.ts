import type {
  ScannerReport,
} from "./report-builder";

export interface RankingItem {

  position: number;

  title: string;

}

export function buildRanking(
  report: ScannerReport
): RankingItem[] {

  return report.recommendedServices.map(

    (service, index) => ({

      position: index + 1,

      title: service,

    })

  );

}
