import { listLeads } from "@/lib/services/leads-service";
import AdminLeadsClient from "@/components/admin/AdminLeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {

  let leads: Awaited<ReturnType<typeof listLeads>> = [];

  let erro: string | null = null;

  try {
    leads = await listLeads();
  } catch (error) {
    erro = error instanceof Error ? error.message : "Erro ao carregar leads.";
  }

  return <AdminLeadsClient initialLeads={leads} initialError={erro} />;

}
