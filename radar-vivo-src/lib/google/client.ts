import {

  GOOGLE_API_KEY,

  GOOGLE_PLACES_URL,

} from "./config/google-env";

import {

  googleFetch,

} from "./http/google-http";

import type {

  GoogleApiResponse,

} from "./contracts/google-response";

export async function searchGoogleBusiness(

  query: string

): Promise<GoogleApiResponse> {

  if (!GOOGLE_API_KEY) {

    return {

      places: [],

    };

  }

  const url =

`${GOOGLE_PLACES_URL}?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;

  const json =

    await googleFetch(url);

  void json;

  return {

    places: [],

  };

}
