export interface GoogleDetailsResponse {

  result: {

    place_id: string;

    name: string;

    formatted_address?: string;

    formatted_phone_number?: string;

    website?: string;

    rating?: number;

    user_ratings_total?: number;

    geometry?: {

      location: {

        lat: number;

        lng: number;

      };

    };

    types?: string[];

  };

}
