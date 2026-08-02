export interface SearchCompany {
  name: string;
  city: string;
  state: string;
  category: string;
  source: string;
  url?: string;
}

export interface SearchProvider {
  search(city: string, state: string, category: string): Promise<SearchCompany[]>;
}
