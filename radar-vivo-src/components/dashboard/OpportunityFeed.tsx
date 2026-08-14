"use client";

import { useEffect, useState } from "react";

import OpportunityCard from "./OpportunityCard";
import RadarSummary from "./RadarSummary";

import { getDashboardFeed } from "@/lib/dashboard";

import type {
  Opportunity,
} from "@/lib/radar/automatic";

export default function OpportunityFeed() {

  const [items, setItems] =
    useState<Opportunity[]>([]);

  useEffect(() => {

    async function load() {

      const data =
        await getDashboardFeed();

      setItems(data);

    }

    load();

  }, []);

  return (

    <section className="mt-12">

      <RadarSummary
        total={items.length}
      />

      <h2 className="text-3xl font-bold mb-8">

        🔥 Oportunidades de Hoje

      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {items.map((item) => (

          <OpportunityCard
            key={item.id}
            opportunity={item}
          />

        ))}

      </div>

    </section>

  );

}