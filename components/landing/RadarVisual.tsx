export default function RadarVisual({ side = "right" }: { side?: "left" | "right" }) {

  return (

    <div className="relative w-[200px] h-[200px] md:w-[420px] md:h-[420px] shrink-0" aria-hidden="true">

      <div className="absolute inset-0 rounded-full border border-green-400/30"></div>

      <div className="absolute inset-0 rounded-full border border-green-400/25 scale-[0.66]"></div>

      <div className="absolute inset-0 rounded-full border border-green-400/20 scale-[0.33]"></div>

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative">

          <div className="w-28 h-28 md:w-56 md:h-56 rounded-full border border-green-400/40 relative overflow-hidden bg-green-500/10">

            <div className="absolute inset-0 radar-sweep">

              <div className="w-1/2 h-1/2 bg-gradient-to-tr from-green-400/50 to-transparent rounded-tl-full"></div>

            </div>

            <div className="absolute top-1/4 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full radar-ping"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

              <div className="w-5 h-5 md:w-8 md:h-8 border-2 border-green-400 rounded-full flex items-center justify-center">

                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full"></div>

              </div>

            </div>

            <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-green-400 rounded-full opacity-90"></div>

            <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full opacity-80"></div>

          </div>

        </div>

      </div>

    </div>

  );

}
