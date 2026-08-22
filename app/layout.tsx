import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.radarvivo.com.br"),
  title: "Radar Vivo - Análise de Presença Digital para Negócios Locais",
  description:
    "Descubra quanto sua empresa está perdendo por não aparecer no Google. Análise gratuita de presença digital com inteligência artificial.",
  openGraph: {
    title: "Radar Vivo",
    description: "Seu próximo cliente já existe. Nós mostramos quem é.",
    url: "https://www.radarvivo.com.br",
    siteName: "Radar Vivo",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </Providers>
      </body>
    </html>
  );
}