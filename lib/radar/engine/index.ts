import { calculateRV } from "./calculate-rv";
import { calculatePotential } from "./calculate-potential";
import { calculateClosing } from "./calculate-closing";
import { recommendService } from "./recommend-service";
import { generateMessage } from "./generate-message";

export type RadarInput = {
  companyName: string;

  city?: string;

  category?: string;

  hasSite: boolean;

  hasSeo: boolean;

  hasWhatsapp: boolean;

  hasInstagram: boolean;

  hasFacebook: boolean;

  googleReviews: number;
};

export async function runRadarEngine(
  input: RadarInput
) {

  const rvIndex =
    calculateRV(input);

  const closingProbability =
    calculateClosing(rvIndex);

  const estimatedValue =
    calculatePotential(rvIndex);

  const recommendedService =
    recommendService(rvIndex);

  const message =
    generateMessage({
      companyName: input.companyName,
      service: recommendedService,
    });

  return {

    rvIndex,

    closingProbability,

    estimatedValue,

    recommendedService,

    message,

  };

}