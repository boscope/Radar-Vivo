export default function HeroSection(){

    return(

        <section className="bg-slate-950 text-white">

            <div className="max-w-7xl mx-auto px-6 py-24">

                <span className="inline-block px-4 py-2 rounded-full bg-slate-800 text-sm">

                    Inteligência Comercial com IA
                </span>

                <h1 className="mt-8 text-6xl font-extrabold leading-tight max-w-4xl">

                    Descubra empresas que realmente têm potencial para comprar seus serviços.
                </h1>

                <p className="mt-8 text-xl text-slate-300 max-w-3xl">

                    O Radar Vivo analisa empresas automaticamente,
                    identifica oportunidades comerciais,
                    calcula o potencial de compra
                    e entrega relatórios executivos em poucos segundos.

                </p>

                <div className="mt-12 flex gap-5 flex-wrap">

                    <a href="/scanner" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition">

                        Testar Gratuitamente

                    </a>

                    <a href="/scanner" className="border border-slate-500 px-8 py-4 rounded-xl hover:bg-slate-900 transition">

                        Ver Demonstração

                    </a>

                </div>

            </div>

        </section>

    );

}
