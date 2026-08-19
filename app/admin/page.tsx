import AdminCard from "@/components/admin/AdminCard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [
    { count: totalUsers },
    { count: totalLeads },
    { count: totalCompanies },
    { data: subscribers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("companies").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("id").eq("subscription_status", "active"),
  ]);

  return (
    <main className="min-h-screen bg-neutral-100 flex">
      <AdminSidebar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-5xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-600 mt-4">
            Gerencie toda a plataforma Radar Vivo.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            <AdminCard
              title="Usuários"
              value={String(totalUsers ?? 0)}
              description="Usuários cadastrados"
            />
            <AdminCard
              title="Assinantes"
              value={String(subscribers?.length ?? 0)}
              description="Clientes ativos"
            />
            <AdminCard
              title="Leads"
              value={String(totalLeads ?? 0)}
              description="Leads capturados"
            />
            <AdminCard
              title="Empresas"
              value={String(totalCompanies ?? 0)}
              description="Empresas analisadas"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
