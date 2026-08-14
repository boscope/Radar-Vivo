export type TechnologyCategory =
  | "cms"
  | "frameworks"
  | "analytics"
  | "marketing"
  | "ecommerce"
  | "chats"
  | "libraries"
  | "infrastructure";

export interface TechnologyRule {
  name: string;
  category: TechnologyCategory;
  signatures: string[];
}

export interface TechnologyResult {
  cms: string[];
  frameworks: string[];
  analytics: string[];
  marketing: string[];
  ecommerce: string[];
  chats: string[];
  libraries: string[];
  infrastructure: string[];
}
