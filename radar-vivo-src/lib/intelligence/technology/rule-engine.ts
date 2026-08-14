import type { TechnologyResult } from "./contracts";
import { TECHNOLOGY_RULES } from "./rules";

export function runTechnologyRules(html: string): TechnologyResult {
  const source = html.toLowerCase();

  const result: TechnologyResult = {
    cms: [],
    frameworks: [],
    analytics: [],
    marketing: [],
    ecommerce: [],
    chats: [],
    libraries: [],
    infrastructure: [],
  };

  for (const rule of TECHNOLOGY_RULES) {
    const matched = rule.signatures.some((signature) =>
      source.includes(signature.toLowerCase())
    );

    if (matched) {
      const bucket = result[rule.category];
      if (!bucket.includes(rule.name)) {
        bucket.push(rule.name);
      }
    }
  }

  return result;
}
