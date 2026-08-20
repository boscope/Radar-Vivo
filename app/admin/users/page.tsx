import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, email, plan, subscription_status, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-white mb-8">
        Usuários
      </h1>

      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-800">
            <tr>
              <th className="text-left p-4 text-neutral-300">Nome</th>
              <th className="text-left p-4 text-neutral-300">Email</th>
              <th className="text-left p-4 text-neutral-300">Plano</th>
              <th className="text-left p-4 text-neutral-300">Status</th>
              <th className="text-left p-4 text-neutral-300">Role</th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((u: any) => (
              <tr
                key={u.id}
                className="border-t border-neutral-800"
              >
                <td className="p-4 text-white">{u.full_name || "Sem nome"}</td>
                <td className="p-4 text-neutral-400">{u.email}</td>
                <td className="p-4 text-neutral-300 uppercase">{u.plan || "free"}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    u.subscription_status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-neutral-700 text-neutral-400"
                  }`}>
                    {u.subscription_status || "inactive"}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    u.role === "admin"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-neutral-700 text-neutral-400"
                  }`}>
                    {u.role || "user"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
