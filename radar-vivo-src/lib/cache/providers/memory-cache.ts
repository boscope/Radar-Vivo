import type {
  CacheProvider,
} from "../contracts/cache-provider";

class MemoryCache
implements CacheProvider {

  private cache =
    new Map<string, unknown>();

  async get<T>(

    key: string

  ): Promise<T | null> {

    return (this.cache.get(key) as T)
      ?? null;

  }

  async set<T>(

    key: string,

    value: T

  ) {

    this.cache.set(

      key,

      value

    );

  }

  async delete(

    key: string

  ) {

    this.cache.delete(key);

  }

}

export const memoryCache =
  new MemoryCache();
