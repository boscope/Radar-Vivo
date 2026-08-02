import type { Opportunity } from "@/lib/radar/automatic";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({
  opportunity,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-green-500 transition">

      <h3 className="text-xl font-bold">

        {opportunity.company}

      </h3>

      <p className="text-zinc-400 mt-2">

        {opportunity.city}

      </p>

      <p className="text-zinc-400">

        {opportunity.category}

      </p>

      <div className="mt-5">

        <span className="bg-green-500 text-black px-4 py-2 rounded-full font-bold">

          Nova oportunidade

        </span>

      </div>

    </div>

  );

}