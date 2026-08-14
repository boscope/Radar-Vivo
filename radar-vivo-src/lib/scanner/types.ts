export type InputType =
  | "company"
  | "cnpj"
  | "website"
  | "google-maps";

export interface ScannerInput {
  original: string;
  normalized: string;
  type: InputType;
}