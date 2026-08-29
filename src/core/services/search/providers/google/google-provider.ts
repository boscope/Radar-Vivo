import { SearchCompany, SearchProvider } from "../../search-engine";
import { searchGooglePlacesByCategory } from "./google-client";
import { collectInstagramFromWebsite } from "@/lib/collector/site-collector";

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

      const instagrams = await this.collectInstagrams(places);

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
    places: { id: string; website?: string }[]
  ): Promise<Map<string, string | undefined>> {
    const result = new Map<string, string | undefined>();

    const tasks = places.map(async (place) => {
      if (!place.website) return;
      const instagram = await collectInstagramFromWebsite(place.website);
      if (instagram) result.set(place.id, instagram);
    });

    await Promise.all(tasks);

    return result;
  }

}
