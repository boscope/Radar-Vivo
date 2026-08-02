import type {
  TechnologyCategory,
  TechnologyResult,
} from "./contracts";

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
    const matched = rule.signatures.some(signature =>
      source.includes(signature.toLowerCase())
    );

    if (!matched) continue;

    const bucket = result[rule.bucket as TechnologyCategory];

    if (!bucket.includes(rule.name)) {
      bucket.push(rule.name);
    }
  }

  (Object.keys(result) as TechnologyCategory[]).forEach(key => {
    result[key].sort();
  });

  return result;
}
