export default function RadarVisual({ side = "right" }: { side?: "left" | "right" }) {

  const cardPosition = side === "right" ? "-right-20" : "-left-20";

  return (

    <div className="relative hidden lg:block w-[420px] h-[420px] shrink-0" aria-hidden="true">

      <div className="absolute inset-0 rounded-full border border-green-400/30"></div>

      <div className="absolute inset-0 rounded-full border border-green-400/25 scale-[0.66]"></div>

      <div className="absolute inset-0 rounded-full border border-green-400/20 scale-[0.33]"></div>

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative">

          <div className="w-56 h-56 rounded-full border border-green-400/40 relative overflow-hidden bg-green-500/10">

            <div className="absolute inset-0 radar-sweep">

              <div className="w-1/2 h-1/2 bg-gradient-to-tr from-green-400/50 to-transparent rounded-tl-full"></div>

            </div>

            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full radar-ping"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

              <div className="w-8 h-8 border-2 border-green-400 rounded-full flex items-center justify-center">

                <div className="w-2 h-2 bg-green-400 rounded-full"></div>

              </div>

            </div>

            <div className="absolute bottom-1/4 left-3/4 w-2.5 h-2.5 bg-green-400 rounded-full opacity-90"></div>

            <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-80"></div>

          </div>

          <div className={`absolute ${cardPosition} top-10 bg-black border border-green-400/50 rounded-xl px-4 py-3 text-sm font-bold text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]`}>

            Empresa sem site detectada

            <div className="text-green-400/80 text-xs font-normal mt-1">

              oportunidade mapeada

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
