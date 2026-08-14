export function calculateBuyingProbability(

  score: number

) {

  return Math.min(

    100,

    Math.round(

      35 + ((100 - score) * 0.65)

    )

  );

}
