import type {
  CacheEntry,
  CacheResult,
} from "./types";

/**
 * ==========================================
 * Radar Vivo Cache
 * ==========================================
 *
 * Implementação inicial em memória.
 *
 * Futuramente será substituído por:
 *
 * ✓ Redis
 * ✓ Supabase
 * ✓ PostgreSQL
 * ✓ Edge Cache
 *
 */

class RadarCache {

  private cache =
    new Map<string, CacheEntry<any>>();

  set<T>(
    key: string,
    data: T,
    ttlMinutes = 60
  ): void {

    const now = new Date();

    const expiresAt =
      new Date(
        now.getTime() +
        ttlMinutes * 60 * 1000
      );

    this.cache.set(key, {

      key,

      data,

      metadata: {

        createdAt: now,

        updatedAt: now,

        expiresAt,

        version: 1,

      },

    });

  }

  get<T>(
    key: string
  ): CacheResult<T> {

    const item =
      this.cache.get(key);

    if (!item) {

      return {

        hit: false,

      };

    }

    if (
      item.metadata.expiresAt <
      new Date()
    ) {

      this.cache.delete(key);

      return {

        hit: false,

      };

    }

    return {

      hit: true,

      value: item as CacheEntry<T>,

    };

  }

  delete(
    key: string
  ): void {

    this.cache.delete(key);

  }

  clear(): void {

    this.cache.clear();

  }

  has(
    key: string
  ): boolean {

    return this.get(key).hit;

  }

  size(): number {

    return this.cache.size;

  }

}

export const radarCache =
  new RadarCache();
