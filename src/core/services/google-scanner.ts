import { SearchManager } from "./search/search-manager";

const manager = new SearchManager();

export async function scanCompanies(
  city: string,
  state: string,
  category: string
) {
  return await manager.search(
    city,
    state,
    category
  );
}
