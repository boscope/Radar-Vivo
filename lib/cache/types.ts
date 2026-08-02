export interface CacheMetadata {

  createdAt: Date;

  updatedAt: Date;

  expiresAt: Date;

  version: number;

}

export interface CacheEntry<T> {

  key: string;

  data: T;

  metadata: CacheMetadata;

}

export interface CacheResult<T> {

  hit: boolean;

  value?: CacheEntry<T>;

}