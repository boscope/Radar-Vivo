import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const ADMIN_EMAILS = ["radarvivocontato@gmail.com"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const supabaseAuthToken = allCookies.find(c => c.name.includes("auth-token"))?.value;

  if (!supabaseAuthToken) {
    redirect("/auth/login");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user } } = await supabase.auth.getUser(supabaseAuthToken);

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
