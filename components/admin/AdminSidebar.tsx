"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Usuários", icon: "👥" },
  { href: "/admin/companies", label: "Empresas", icon: "🏢" },
  { href: "/admin/leads", label: "Leads", icon: "📋" },
  { href: "/admin/settings", label: "Configurações", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 min-h-screen flex flex-col">
      <div className="p-6 border-b border-neutral-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">RV</span>
          </div>
          <div>
            <span className="text-lg font-bold">
              <span className="text-green-400">Radar</span>
              <span className="text-white">Vivo</span>
            </span>
            <div className="text-xs text-neutral-500">Admin</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                isActive
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-neutral-500 hover:text-white transition text-sm rounded-xl hover:bg-neutral-800 mb-2"
        >
          <span>🌐</span>
          <span>Ver site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition text-sm rounded-xl hover:bg-red-500/10 w-full"
        >
          <span>🚪</span>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
