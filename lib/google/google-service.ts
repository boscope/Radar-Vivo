import {
  GoogleRegistry,
} from "./registry";

import type {
  GoogleCompany,
} from "./models/google-company";

const registry =
  new GoogleRegistry();

export async function findGoogleCompany(

  company: string

): Promise<GoogleCompany | null> {

  return registry
    .getProvider()
    .searchCompany(company);

}
