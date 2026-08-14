import {
  GOOGLE_API_KEY,
  GOOGLE_DETAILS_URL,
} from "../config/google-env";

import {
  googleFetch,
} from "./google-http";

import type {
  GoogleDetailsResponse,
} from "../contracts/google-details";

export async function fetchGoogleDetails(

  placeId: string

): Promise<GoogleDetailsResponse | null> {

  if (!GOOGLE_API_KEY) {

    return null;

  }

  const url =
`${GOOGLE_DETAILS_URL}?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

  return googleFetch(url);

}
