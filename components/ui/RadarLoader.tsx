"use client";

export default function RadarLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-green-500/30" />
        <div className="absolute inset-2 rounded-full border-2 border-green-500/20" />
        <div className="absolute inset-4 rounded-full border-2 border-green-500/10" />
        <div className="absolute inset-0 rounded-full origin-center"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, #22c55e44 90deg, transparent 90deg)",
            animation: "radarSpin 1.2s linear infinite",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
      {text && <p className="text-neutral-400 text-sm animate-pulse">{text}</p>}
      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
