import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const ADMIN_EMAILS = ["radarvivocontato@gmail.com"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
    redirect("/auth/login?redirect=%2Fadmin");
  }

  return <>{children}</>;
}
