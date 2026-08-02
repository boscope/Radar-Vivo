export interface GoogleClient {

  searchCompany(
    company: string
  ): Promise<unknown>;

}
