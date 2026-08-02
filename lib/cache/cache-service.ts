import { CacheManager } from "./cache-manager";

export class CacheService {

  static async remember<T>(
    key: string,
    callback: () => Promise<T>
  ): Promise<T> {

    const cached =
      CacheManager.getCompany(key);

    if (
      cached.hit &&
      cached.value
    ) {

      return cached.value.data as T;

    }

    const result =
      await callback();

    CacheManager.saveCompany(
      key,
      result
    );

    return result;

  }

}
