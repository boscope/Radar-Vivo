import type { GoogleData } from "./types";

export interface MapsData {

  latitude?: number;

  longitude?: number;

  openNow?: boolean;

}

export async function collectMaps(
  google: GoogleData
): Promise<MapsData> {

  if (!google.googleMapsUrl) {

    return {

      latitude: undefined,

      longitude: undefined,

      openNow: undefined,

    };

  }

  return {

    latitude: -23.310,

    longitude: -51.162,

    openNow: true,

  };

}
