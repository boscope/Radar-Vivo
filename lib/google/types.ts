export interface GooglePlace {

  placeId: string;

  name: string;

  address: string;

  city: string;

  phone?: string;

  website?: string;

  rating?: number;

  reviews?: number;

  businessStatus?: string;

  location: {

    lat: number;

    lng: number;

  };

}

export interface GoogleSearchResult {

  places: GooglePlace[];

}
