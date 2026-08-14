import type {
  IntelligenceResult,
} from "@/lib/intelligence";

export interface GoogleData {

  companyName: string;

  city: string;

  category: string;

  phone?: string;

  googleMapsUrl?: string;

  googleRating?: number;

  googleReviews?: number;

  hasWhatsapp?: boolean;

  instagram?: string;

  facebook?: string;

  linkedin?: string;

  youtube?: string;

  tiktok?: string;

}

export interface WebsiteData {

  website?: string;

  hasWebsite: boolean;

  hasSeo: boolean;

  seoScore?: number;

  hasSSL?: boolean;

  hasSitemap?: boolean;

  hasRobots?: boolean;

  hasOpenGraph?: boolean;

  hasSchema?: boolean;

  hasAnalytics?: boolean;

  hasTagManager?: boolean;

  hasMetaPixel?: boolean;

  isResponsive?: boolean;

  pageTitle?: string;

  metaDescription?: string;

  h1?: string;

  technologies?: string[];

  responseTime?: number;

  performanceScore?: number;

}

export interface CompanyData {

  companyName: string;

  website?: string;

  cnpj?: string;

  googleMapsUrl?: string;

  city: string;

  category: string;

  phone?: string;

  email?: string;

  instagram?: string;

  facebook?: string;

  linkedin?: string;

  youtube?: string;

  tiktok?: string;

  googleRating?: number;

  googleReviews?: number;

  hasWebsite: boolean;

  hasSeo: boolean;

  hasWhatsapp: boolean;

  intelligence: IntelligenceResult;

  websiteData?: WebsiteData;

}