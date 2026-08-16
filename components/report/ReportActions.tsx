export default function ReportActions(){

    return(

        <div className="flex flex-wrap gap-4 justify-end">

            <button
                className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
            >
                Compartilhar
            </button>

            <button
                className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
            >
                Imprimir
            </button>

            <button
                className="px-5 py-3 rounded-xl bg-neutral-950 text-white hover:bg-neutral-900 transition"
            >
                Exportar PDF (em breve)
            </button>

        </div>

    );

}
