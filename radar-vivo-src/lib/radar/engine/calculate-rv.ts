import type { RadarInput } from "./index";

export function calculateRV(
  input: RadarInput
): number {

  let score = 50;

  // Possui Site
  if (!input.hasSite) {
    score += 20;
  }

  // SEO
  if (!input.hasSeo) {
    score += 15;
  }

  // WhatsApp
  if (!input.hasWhatsapp) {
    score += 10;
  }

  // Instagram
  if (!input.hasInstagram) {
    score += 10;
  }

  // Facebook
  if (!input.hasFacebook) {
    score += 5;
  }

  // Google Reviews
  if (input.googleReviews < 10) {

    score += 15;

  } else if (input.googleReviews < 30) {

    score += 10;

  } else if (input.googleReviews > 200) {

    score -= 10;

  }

  // Limita entre 0 e 100
  if (score > 100) score = 100;

  if (score < 0) score = 0;

  return score;

}