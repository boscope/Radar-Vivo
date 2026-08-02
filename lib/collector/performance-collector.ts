import type { WebsiteData } from "./types";

export interface PerformanceData {

  performance: number;

  accessibility: number;

  bestPractices: number;

  seo: number;

}

export async function collectPerformance(
  website: WebsiteData
): Promise<PerformanceData> {

  if (!website.website) {

    return {

      performance: 0,

      accessibility: 0,

      bestPractices: 0,

      seo: 0,

    };

  }

  return {

    performance: 82,

    accessibility: 91,

    bestPractices: 88,

    seo: 79,

  };

}
