import type {
  GooglePlace,
} from "./types";

import type {
  GoogleData,
} from "@/lib/collector";

export function adaptGooglePlace(
  place: GooglePlace
): GoogleData {

  return {

    companyName: place.name,

    city: place.city,

    category:
      place.businessStatus ?? "Empresa",

    phone:
      place.phone,

    googleMapsUrl:
      `https://www.google.com/maps/place/?q=place_id:${place.placeId}`,

    googleRating:
      place.rating,

    googleReviews:
      place.reviews,

    hasWhatsapp: false,

  };

}
