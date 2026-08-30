import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.radarvivo.com.br";

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
    lastModified: Date;
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: new Date() },
    { path: "/busca", priority: 0.9, changeFrequency: "monthly", lastModified: new Date() },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly", lastModified: new Date() },
    { path: "/contato", priority: 0.7, changeFrequency: "monthly", lastModified: new Date() },
    { path: "/auth/login", priority: 0.6, changeFrequency: "monthly", lastModified: new Date() },
    { path: "/auth/cadastro", priority: 0.6, changeFrequency: "monthly", lastModified: new Date() },
    { path: "/privacidade", priority: 0.4, changeFrequency: "yearly", lastModified: new Date() },
    { path: "/termos", priority: 0.4, changeFrequency: "yearly", lastModified: new Date() },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
