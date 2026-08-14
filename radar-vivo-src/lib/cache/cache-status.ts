import { cacheHealth } from "./health";
import { cacheMetrics } from "./cache-metrics";

export function cacheStatus() {

  return {

    health: cacheHealth(),

    metrics: cacheMetrics.get(),

  };

}
