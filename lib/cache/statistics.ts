import { radarCache } from "./cache";

export interface CacheStatistics {

  totalItems: number;

}

export function getCacheStatistics():
CacheStatistics {

  return {

    totalItems:
      radarCache.size(),

  };

}
