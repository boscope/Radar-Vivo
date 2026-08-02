import type {
  Provider,
} from "@/lib/core";

import type {
  GoogleCompany,
} from "./models/google-company";

export interface GoogleProvider
extends Provider<GoogleCompany> {

  searchCompany(
    company: string
  ): Promise<GoogleCompany | null>;

}
