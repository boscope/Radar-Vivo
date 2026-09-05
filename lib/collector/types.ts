import type {
  IntelligenceResult,
} from "@/lib/intelligence";

export interface GoogleData {

  companyName: string;

  city: string;

  category: string;

  phone?: string;

  email?: string;

  cnpj?: string;

  website?: string;

  googleMapsUrl?: string;

  googleRating?: number;

  googleReviews?: number;

  hasWhatsapp?: boolean;

  instagram?: string;

  facebook?: string;

  linkedin?: string;

  youtube?: string;

  tiktok?: string;

  googlePlaceId?: string;

}

export interface WebsiteData {

  website?: string;

  hasWebsite: boolean;

  websiteDown?: boolean;

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

  hasGoogleAds?: boolean;

  hasAutomation?: boolean;

  automationTool?: string;

  isResponsive?: boolean;

  pageTitle?: string;

  metaDescription?: string;

  h1?: string;

  technologies?: string[];

  responseTime?: number;

  performanceScore?: number;

  hasWhatsapp?: boolean;

  instagram?: string;

  facebook?: string;

  whatsapp?: string;

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

  hasGoogle: boolean;

  hasWhatsapp: boolean;

  hasGoogleAds?: boolean;

  hasMetaAds?: boolean;

  hasAutomation?: boolean;

  automationTool?: string;

  intelligence: IntelligenceResult;

  websiteData?: WebsiteData;

}