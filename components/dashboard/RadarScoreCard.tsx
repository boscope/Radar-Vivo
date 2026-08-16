import { calculateRadarScore } from "@/src/core/intelligence/score/radar-score-engine";

interface Props{
  score:number;
}

export default function RadarScoreCard({score}:Props){

  const radar=calculateRadarScore(score);

  return(

    <div className="bg-neutral-900 rounded-2xl shadow-lg p-6 border border-neutral-800">

      <h2 className="text-lg font-bold mb-4">
        Radar Score
      </h2>

      <div className="text-5xl font-black">

        {radar.score}

      </div>

      <div className="text-2xl mt-3">

        {radar.stars}

      </div>

      <div className="mt-3 font-semibold">

        {radar.classification}

      </div>

      <div className="mt-4 text-sm text-gray-500">

        Prioridade: {radar.priority}

      </div>

    </div>

  );

}
