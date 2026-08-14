export interface GoogleApiLocation {

  lat: number;

  lng: number;

}

export interface GoogleApiPlace {

  placeId: string;

  name: string;

  address: string;

  city: string;

  phone?: string;

  website?: string;

  rating?: number;

  reviews?: number;

  businessStatus?: string;

  location: GoogleApiLocation;

}

export interface GoogleApiResponse {

  places: GoogleApiPlace[];

}
