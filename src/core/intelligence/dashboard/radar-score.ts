export function getRadarScore(probability:number){

  if(probability>=95){

    return{

      stars:"★★★★★",

      level:"EXTREMO",

      color:"text-red-600"

    };

  }

  if(probability>=85){

    return{

      stars:"★★★★☆",

      level:"MUITO ALTO",

      color:"text-orange-600"

    };

  }

  if(probability>=70){

    return{

      stars:"★★★☆☆",

      level:"ALTO",

      color:"text-yellow-600"

    };

  }

  if(probability>=50){

    return{

      stars:"★★☆☆☆",

      level:"MÉDIO",

      color:"text-blue-600"

    };

  }

  return{

    stars:"★☆☆☆☆",

    level:"BAIXO",

    color:"text-gray-500"

  };

}
