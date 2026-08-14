import { getCacheStatistics } from "./statistics";

export interface CacheHealth {

  status: "healthy";

  items: number;

}

export function cacheHealth():
CacheHealth {

  const stats =
    getCacheStatistics();

  return {

    status: "healthy",

    items: stats.totalItems,

  };

}
