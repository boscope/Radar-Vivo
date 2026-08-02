import type {
  GoogleApiPlace,
} from "../contracts/google-response";

import type {
  GoogleCompany,
} from "../models/google-company";

export function mapGooglePlace(

  place: GoogleApiPlace

): GoogleCompany {

  return {

    id:
      place.placeId,

    companyName:
      place.name,

    city:
      place.city,

    address:
      place.address,

    category:
      place.businessStatus ??
      "Empresa",

    phone:
      place.phone,

    website:
      place.website,

    rating:
      place.rating,

    reviews:
      place.reviews,

    latitude:
      place.location.lat,

    longitude:
      place.location.lng,

  };

}
