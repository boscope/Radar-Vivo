"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("rv_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("rv_cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-700 rounded-xl p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-neutral-300">
              🍪 Utilizamos cookies essenciais para o funcionamento da plataforma
              (login, preferências).{" "}
              <strong className="text-white">
                Não utilizamos cookies de rastreamento ou publicidade.
              </strong>{" "}
              Saiba mais na nossa{" "}
              <a
                href="/privacidade"
                className="text-green-400 hover:underline"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </div>
          <button
            onClick={accept}
            className="shrink-0 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-lg text-sm transition"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
