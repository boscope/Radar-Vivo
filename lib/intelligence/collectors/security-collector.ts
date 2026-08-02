export async function collectSecurity(

  url: string

){

  try{

    const response=

      await fetch(url,{

        method:"HEAD",

        redirect:"follow"

      });

    const headers=

      response.headers;

    return{

      https:

        url.startsWith("https://"),

      hsts:

        headers.has(

          "strict-transport-security"

        ),

      csp:

        headers.has(

          "content-security-policy"

        ),

      xframe:

        headers.has(

          "x-frame-options"

        ),

      server:

        headers.get("server") ??

        undefined

    };

  }

  catch{

    return{

      https:false,

      hsts:false,

      csp:false,

      xframe:false

    };

  }

}
