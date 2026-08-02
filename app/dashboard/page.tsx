"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { getCompanies } from "@/lib/services/company-service";

import type { Company } from "@/types/company";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CompaniesTable from "@/components/dashboard/CompaniesTable";

export default function DashboardPage() {

  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  useEffect(() => {

    async function carregar() {

      try {

        const data = await getCompanies();
        setCompanies(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    carregar();

  }, []);

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto p-8">

        <DashboardHeader
          onLogout={sair}
        />

        <DashboardStats
          companies={companies}
        />

        <CompaniesTable
          companies={companies}
          loading={loading}
        />

      </div>

    </main>

  );

}