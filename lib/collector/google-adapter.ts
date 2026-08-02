import type {
  GoogleCompany,
} from "@/lib/google";

import type {
  GoogleData,
} from "./types";

export function googleCompanyToCollector(
  company: GoogleCompany
): GoogleData {

  return {

    companyName:
      company.companyName,

    city:
      company.city,

    category:
      company.category,

    phone:
      company.phone,

    googleMapsUrl:
      undefined,

    googleRating:
      company.rating,

    googleReviews:
      company.reviews,

    hasWhatsapp:
      false,

  };

}
