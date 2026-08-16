import { SearchCompany, SearchProvider } from "../../search-engine";
import { searchGooglePlacesByCategory } from "./google-client";

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

      return places.map((place, index) => ({
        name: place.name,
        city,
        state,
        category,
        source: "google",
        url: place.website,
        mapsUrl: place.mapsUrl,
        phone: place.phone,
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

}
