"use client";

import { useEffect, useState } from "react";

type TourStep = {
  title: string;
  description: string;
};

const STEPS: TourStep[] = [
  {
    title: "Bem-vindo ao Radar Vivo!",
    description:
      "Este é um tour rápido pela plataforma. Em menos de um minuto você vai entender como encontrar empresas e transformá-las em leads.",
  },
  {
    title: "Busque empresas",
    description:
      "Use a área de busca para encontrar negócios locais por nome, categoria ou região. Cada empresa recebe uma análise completa de presença digital.",
  },
  {
    title: "Dashboard",
    description:
      "Aqui ficam suas métricas: score digital, oportunidades detectadas e estatísticas gerais das empresas que você analisou.",
  },
  {
    title: "Pipeline de leads",
    description:
      "Organize e acompanhe seus leads por estágio do funil. Mova cards conforme o avanço da negociação e nunca perca uma oportunidade de venda.",
  },
];

const STORAGE_KEY = "onboarding_completed";

export default function OnboardingTour() {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    try {
      const completed = localStorage.getItem(STORAGE_KEY);
      if (!completed) {
        queueMicrotask(() => {
          if (!cancelled) setVisible(true);
        });
      }
    } catch {
      return () => {
        cancelled = true;
      };
    }
    return () => {
      cancelled = true;
    };
  }, []);

  function finish() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      return;
    }
    setVisible(false);
  }

  function next() {
    if (stepIndex >= STEPS.length - 1) {
      finish();
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  if (!visible) {
    return (
      <button
        onClick={() => {
          setStepIndex(0);
          setVisible(true);
        }}
        aria-label="Repetir tour"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#22c55e] text-black font-bold text-lg shadow-lg hover:bg-green-500 hover:scale-110 transition-all duration-200"
      >
        ?
      </button>
    );
  }

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative">
        <div className="flex gap-2 mb-6 justify-center">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === stepIndex ? "w-8 bg-[#22c55e]" : "w-2 bg-neutral-200"
              }`}
            />
          ))}
        </div>

        <div key={stepIndex} className="transition-all duration-300 ease-out">
          <h2 className="text-xl font-bold text-neutral-900 mb-3 text-center">{step.title}</h2>
          <p className="text-neutral-600 text-sm leading-relaxed text-center mb-8">{step.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Passo {stepIndex + 1} de {STEPS.length}
          </span>
          <div className="flex items-center gap-3">
            {!isLast && (
              <button
                onClick={finish}
                className="text-xs text-neutral-400 hover:text-neutral-600 transition"
              >
                Pular
              </button>
            )}
            <button
              onClick={next}
              className="bg-[#22c55e] hover:bg-green-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
            >
              {isLast ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={finish}
        aria-label="Fechar tour"
        className="absolute top-6 right-6 text-white/60 hover:text-white transition text-2xl leading-none"
      >
        ×
      </button>
    </div>
  );
}
