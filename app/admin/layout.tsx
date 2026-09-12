import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const ADMIN_EMAILS = ["radarvivocontato@gmail.com"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=%2Fadmin");
  }

  const emailOk = ADMIN_EMAILS.includes(user.email ?? "");

  if (!emailOk) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      redirect("/auth/login?redirect=%2Fadmin");
    }
  }

  return <>{children}</>;
}
