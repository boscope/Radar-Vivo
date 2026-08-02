export interface Company {
  id: string;

  company_name: string;

  category: string;

  city: string;

  rv_index: number;

  estimated_value: number;

  website: string | null;

  google_rating: number | null;

  google_reviews: number | null;

  instagram: string | null;

  facebook: string | null;

  has_whatsapp: boolean;

  has_google_business: boolean;

  has_seo: boolean;

  has_ads: boolean;

  has_automation: boolean;

  diagnosis: string | null;

  closing_probability: number | null;

  monthly_loss: number | null;

  recommended_service: string | null;
}