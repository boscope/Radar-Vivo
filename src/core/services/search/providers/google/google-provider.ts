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

    const collectFromWebsite = async (place: { id: string; website?: string }) => {
      if (!place.website) return;
      const instagram = await collectInstagramFromWebsite(place.website);
      if (instagram) result.set(place.id, instagram);
    };

    await Promise.all(places.map(collectFromWebsite));

    let discovered = 0;
    for (const place of places) {
      if (result.has(place.id)) continue;
      if (discovered >= 10) break;

      const byName = await discoverInstagramByName(place.name, city);
      if (byName) {
        result.set(place.id, byName);
        discovered += 1;
      }
      await new Promise((res) => setTimeout(res, 350));
    }

    return result;
  }

}
