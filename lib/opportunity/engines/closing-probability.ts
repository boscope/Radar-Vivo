export function calculateClosingProbability(

  buying: number,

  timing: number

) {

  return Math.round(

    (buying + timing) / 2

  );

}
