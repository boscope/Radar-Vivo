import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: "/logo-512.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Radar Vivo",
    description: "Seu próximo cliente já existe. Nós mostramos quem é.",
    url: "https://www.radarvivo.com.br",
    siteName: "Radar Vivo",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo-512.png"],
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Providers>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </Providers>
      </body>
    </html>
  );
}