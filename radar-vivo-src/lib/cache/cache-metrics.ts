export interface CacheMetrics {

  hits: number;

  misses: number;

  writes: number;

  deletes: number;

}

class Metrics {

  private metrics: CacheMetrics = {

    hits: 0,

    misses: 0,

    writes: 0,

    deletes: 0,

  };

  hit() {

    this.metrics.hits++;

  }

  miss() {

    this.metrics.misses++;

  }

  write() {

    this.metrics.writes++;

  }

  delete() {

    this.metrics.deletes++;

  }

  get(): CacheMetrics {

    return {

      ...this.metrics,

    };

  }

  reset() {

    this.metrics = {

      hits: 0,

      misses: 0,

      writes: 0,

      deletes: 0,

    };

  }

}

export const cacheMetrics =
  new Metrics();
