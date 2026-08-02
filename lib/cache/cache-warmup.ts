import { CacheManager } from "./cache-manager";

export class CacheWarmup {

  static warmCompany<T>(
    company: string,
    data: T
  ) {

    CacheManager.saveCompany(
      company,
      data
    );

  }

  static warmWebsite<T>(
    website: string,
    data: T
  ) {

    CacheManager.saveWebsite(
      website,
      data
    );

  }

}
