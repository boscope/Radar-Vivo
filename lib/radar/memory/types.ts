export interface CompanySnapshot {

  companyId: string;

  collectedAt: Date;

  rvIndex: number;

  website: boolean;

  seo: boolean;

  automation: boolean;

  googleAds: boolean;

  metaAds: boolean;

  instagram: boolean;

  facebook: boolean;

}

export interface CompanyChange {

  field: string;

  oldValue: unknown;

  newValue: unknown;

}

export interface CompanyHistory {

  companyId: string;

  snapshots: CompanySnapshot[];

}