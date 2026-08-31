import { SearchCompany, SearchProvider } from "../../search-engine";
import { searchGooglePlacesByCategory } from "./google-client";
import { collectInstagramFromWebsite, discoverInstagramByName } from "@/lib/collector/site-collector";

export class GoogleProvider implements SearchProvider {

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    try {

      const places = await searchGooglePlacesByCategory(
        category,
        city,
        state,
        20
      );

      console.log("[GOOGLE PROVIDER] Places encontrados:", places.length);

      const instagrams = await this.collectInstagrams(places, city);

      return places.map((place, index) => ({
        name: place.name,
        city,
        state,
        category,
        source: "google",
        url: place.website,
        mapsUrl: place.mapsUrl,
        phone: place.phone,
        instagram: instagrams.get(place.id),
        rating: place.rating,
        lat: place.latitude,
        lon: place.longitude,
        googlePlaceId: place.id,
        priority: index < 5 ? "Alta" : "Média",
      }));

    } catch (error) {

      console.error("[GOOGLE PROVIDER] Erro:", error);
      return [];

    }

  }

  private async collectInstagrams(
    places: { id: string; name: string; website?: string }[],
    city: string
  ): Promise<Map<string, string | undefined>> {
    const result = new Map<string, string | undefined>();

    await Promise.all(
      places.map(async (place) => {
        if (!place.website) return;
        const instagram = await collectInstagramFromWebsite(place.website);
        if (instagram) result.set(place.id, instagram);
      })
    );

    const start = Date.now();
    const BUDGET_MS = 10_000;

    const pending = places.filter(
      (place) => !result.has(place.id)
    );

    let next = 0;
    const workers = Array.from({ length: 3 }, async () => {
      while (next < pending.length) {
        if (Date.now() - start > BUDGET_MS) break;

        const place = pending[next];
        next += 1;

        const byName = await discoverInstagramByName(place.name, city);
        if (byName) result.set(place.id, byName);
      }
    });

    await Promise.all(
      workers.map((w) =>
        Promise.race([w, new Promise((r) => setTimeout(r, 12_000))])
      )
    );

    return result;
  }

}
