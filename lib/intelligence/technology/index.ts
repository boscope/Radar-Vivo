import { fetchHtml } from "./fetch-html";
import { runTechnologyRules } from "./rule-engine";

export async function analyzeTechnologies(url: string) {
  const html = await fetchHtml(url);
  return runTechnologyRules(html);
}

export { runTechnologyRules };
