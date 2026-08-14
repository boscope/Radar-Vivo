import {
  collectSecurity,
  collectRobots,
  collectSitemap,
} from "./collectors";

export async function buildSiteIntelligence(

  website:string

){

  const

    security=

      await collectSecurity(

        website

      );

  const

    robots=

      await collectRobots(

        website

      );

  const

    sitemap=

      await collectSitemap(

        website

      );

  return{

    security,

    robots,

    sitemap,

  };

}
