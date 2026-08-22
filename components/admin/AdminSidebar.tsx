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

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function AdminSidebar({ open, onClose }: Props) {
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

  const sidebarContent = (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 min-h-screen flex flex-col">
      <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
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
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-neutral-400 hover:text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
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
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 text-neutral-500 hover:text-white transition text-sm rounded-xl hover:bg-neutral-800 mb-2"
        >
          <span>🌐</span>
          <span>Ver site</span>
        </a>
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

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">{sidebarContent}</div>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div className="relative">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
