import {
  CompanyEntity,
  ICompanyRepository
} from "../interfaces/company-repository-interface";

export class CompanyRepository implements ICompanyRepository {

  private companies: CompanyEntity[] = [];

  async save(company: CompanyEntity): Promise<void> {

    this.companies.push(company);

  }

  async findAll(): Promise<CompanyEntity[]> {

    return this.companies;

  }

  async total(): Promise<number> {

    return this.companies.length;

  }

}
