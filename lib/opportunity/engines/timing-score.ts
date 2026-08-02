export function calculateTimingScore(

  score: number

) {

  return Math.min(

    100,

    Math.round(

      40 + ((100 - score) * 0.60)

    )

  );

}
