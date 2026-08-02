import AdminCard from "@/components/admin/AdminCard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex">

      <AdminSidebar />

      <div className="flex-1">

        <div className="max-w-7xl mx-auto p-8">

          <h1 className="text-5xl font-bold">
            Painel Administrativo
          </h1>

          <p className="text-gray-600 mt-4">
            Gerencie toda a plataforma Radar Vivo.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">

            <AdminCard
              title="Usuários"
              value="128"
              description="Usuários cadastrados"
            />

            <AdminCard
              title="Assinantes"
              value="24"
              description="Clientes ativos"
            />

            <AdminCard
              title="Relatórios"
              value="534"
              description="Relatórios gerados"
            />

            <AdminCard
              title="Empresas"
              value="891"
              description="Empresas analisadas"
            />

          </div>

        </div>

      </div>

    </main>
  );
}
