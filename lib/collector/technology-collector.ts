import { analyzeTechnologies } from "@/lib/intelligence/technology";

export async function collectTechnologies(website?: string | null) {
  if (!website) {
    return {
      cms: [],
      frameworks: [],
      analytics: [],
      marketing: [],
      ecommerce: [],
      chats: [],
      libraries: [],
      infrastructure: [],
    };
  }

  return analyzeTechnologies(website);
}
