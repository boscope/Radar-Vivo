"use client";

import { AuthProvider } from "@/lib/auth-context";
import CookieConsent from "@/components/CookieConsent";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <CookieConsent />
    </AuthProvider>
  );
}
