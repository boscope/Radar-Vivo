import type {
  GoogleProvider,
} from "./provider";

import {
  getGoogleCompany,
} from "./service";

export class GoogleProviderImpl
implements GoogleProvider {

  async find(
    company: string
  ) {
    return this.searchCompany(company);
  }

  async searchCompany(
    company: string
  ) {
    return getGoogleCompany(company);
  }

}
