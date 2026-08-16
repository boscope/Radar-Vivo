export interface SearchCompany {
  name: string;
  city: string;
  state: string;
  category: string;
  source: string;
  url?: string;
  mapsUrl?: string;
  phone?: string;
  rating?: number;
  lat?: number;
  lon?: number;
  googlePlaceId?: string;
}

export interface SearchProvider {
  search(city: string, state: string, category: string): Promise<SearchCompany[]>;
}
