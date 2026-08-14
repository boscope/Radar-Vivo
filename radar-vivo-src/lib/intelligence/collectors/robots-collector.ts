export async function collectRobots(

  website:string

){

  try{

    const url=

      website.replace(/\/$/,"")+

      "/robots.txt";

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
