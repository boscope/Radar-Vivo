export async function collectSitemap(

  website:string

){

  try{

    const url=

      website.replace(/\/$/,"")+

      "/sitemap.xml";

    const r=

      await fetch(url);

    return{

      exists:r.ok

    };

  }

  catch{

    return{

      exists:false

    };

  }

}
