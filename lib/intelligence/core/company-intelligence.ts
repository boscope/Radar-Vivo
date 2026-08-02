import { analyzeBusinessWebsite } from "./index";

export async function enrichCompanyIntelligence(company: any) {

  if (!company?.website) {
    return company;
  }

  try {

    const core =
      await analyzeBusinessWebsite(
        company.website
      );

    return {

      ...company,

      intelligence: {

        ...company.intelligence,

        opportunity:
          core.opportunity,

        commercial:
          core.commercial,

        technologies:
          core.technologies,

      },

    };

  } catch {

    return company;

  }

}
