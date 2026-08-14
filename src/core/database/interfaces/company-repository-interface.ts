export interface CompanyEntity {

  id: string;

  name: string;

  city: string;

  state: string;

  category: string;

  source: string;

  url?: string;

  phone?: string;

  website?: string;

  rating?: number;

  reviews?: number;

  createdAt: Date;

}

export interface ICompanyRepository {

  save(company: CompanyEntity): Promise<void>;

  findAll(): Promise<CompanyEntity[]>;

  total(): Promise<number>;

}
