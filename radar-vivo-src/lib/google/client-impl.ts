import type {
  GoogleClient,
} from "./contracts/google-client";

import {
  searchGoogleBusiness,
} from "./client";

export class GoogleClientImpl
implements GoogleClient {

  async searchCompany(
    company: string
  ) {
    return searchGoogleBusiness(company);
  }

}
