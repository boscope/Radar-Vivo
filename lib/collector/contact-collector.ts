import type { CompanyData } from "./types";

export interface ContactData {

  email?: string;

  whatsapp?: string;

}

export async function collectContact(
  company: CompanyData
): Promise<ContactData> {

  return {

    email: company.email,

    whatsapp: company.phone,

  };

}
