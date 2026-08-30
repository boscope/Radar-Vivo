import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.radarvivo.com.br";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/auth", "/meus-dados", "/admin", "/intelligence"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
