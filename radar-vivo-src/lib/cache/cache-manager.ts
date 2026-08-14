import { radarCache } from "./cache";
import { CacheKey } from "./cache-key";
import { CacheConfig } from "./cache-config";

export class CacheManager {

  static getCompany(company: string) {

    return radarCache.get(
      CacheKey.company(company)
    );

  }

  static saveCompany<T>(
    company: string,
    data: T
  ) {

    radarCache.set(

      CacheKey.company(company),

      data,

      CacheConfig.COMPANY_TTL

    );

  }

  static getWebsite(
    website: string
  ) {

    return radarCache.get(

      CacheKey.website(website)

    );

  }

  static saveWebsite<T>(
    website: string,
    data: T
  ) {

    radarCache.set(

      CacheKey.website(website),

      data,

      CacheConfig.WEBSITE_TTL

    );

  }

  static clear() {

    radarCache.clear();

  }

}
