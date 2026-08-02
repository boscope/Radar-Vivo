"use client";

interface Props {
  total: number;
}

export default function RadarSummary({
  total,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 mb-10">

      <h2 className="text-3xl font-bold">

        🚀 Radar Vivo

      </h2>

      <p className="text-zinc-400 mt-3">

        O Radar trabalhou para você.

      </p>

      <div className="mt-8">

        <div className="text-6xl font-bold text-green-400">

          {total}

        </div>

        <p className="text-zinc-400 mt-2">

          oportunidades encontradas

        </p>

      </div>

    </div>

  );

}