import {
  searchGoogleBusiness,
} from "./client";

import {
  mapGooglePlace,
} from "./mappers/google-place-mapper";

import type {
  GoogleCompany,
} from "./models/google-company";

export async function getGoogleCompany(

  company: string

): Promise<GoogleCompany | null> {

  const result =
    await searchGoogleBusiness(company);

  if (
    result.places.length === 0
  ) {

    return null;

  }

  return mapGooglePlace(

    result.places[0]

  );

}
