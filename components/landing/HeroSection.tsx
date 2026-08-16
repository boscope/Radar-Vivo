export default function HeroSection(){

    return(

        <section className="bg-black text-white">

            <div className="max-w-7xl mx-auto px-6 py-24">

                <span className="inline-block px-4 py-2 rounded-full bg-neutral-900 text-sm">

                    Inteligência Comercial com IA
                </span>

                <h1 className="mt-8 text-6xl font-extrabold leading-tight max-w-4xl">

                    Descubra empresas que realmente têm potencial para comprar seus serviços.
                </h1>

                <p className="mt-8 text-xl text-neutral-300 max-w-3xl">

                    O Radar Vivo analisa empresas automaticamente,
                    identifica oportunidades comerciais,
                    calcula o potencial de compra
                    e entrega relatórios executivos em poucos segundos.

                </p>

                <div className="mt-12 flex gap-5 flex-wrap">

                    <a href="/scanner" className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition">

                        Testar Gratuitamente

                    </a>

                    <a href="/scanner" className="border border-neutral-600 px-8 py-4 rounded-xl hover:bg-neutral-900 transition">

                        Ver Demonstração

                    </a>

                </div>

            </div>

        </section>

    );

}
