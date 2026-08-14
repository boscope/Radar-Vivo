import { runAutomaticRadar } from "@/lib/radar/automatic";

import type { Opportunity } from "@/lib/radar/automatic";

export async function getDashboardFeed(): Promise<Opportunity[]> {

  const opportunities =
    await runAutomaticRadar(
      "Londrina",
      "Todos"
    );

  return opportunities;

}