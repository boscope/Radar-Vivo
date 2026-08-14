import type { GoogleData } from "./types";

export interface ReputationData {

  reputationScore: number;

  reviewLevel: "Excelente" | "Boa" | "Regular" | "Ruim";

}

export async function collectReputation(
  google: GoogleData
): Promise<ReputationData> {

  const rating =
    google.googleRating ?? 0;

  const reviews =
    google.googleReviews ?? 0;

  const score =
    Math.min(
      100,
      Math.round(
        rating * 15 + Math.min(reviews, 500) * 0.07
      )
    );

  let reviewLevel:
    ReputationData["reviewLevel"] =
    "Ruim";

  if (score >= 85)
    reviewLevel = "Excelente";
  else if (score >= 70)
    reviewLevel = "Boa";
  else if (score >= 50)
    reviewLevel = "Regular";

  return {

    reputationScore: score,

    reviewLevel,

  };

}
