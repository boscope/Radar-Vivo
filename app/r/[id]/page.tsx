import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ShortLinkPage({ params }: Props) {
  const { id } = await params;

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await admin
    .from("short_links")
    .select("target_url")
    .eq("id", id)
    .single();

  if (data?.target_url) {
    redirect(data.target_url);
  }

  redirect("/");
}
