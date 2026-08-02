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
                className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
                Exportar PDF (em breve)
            </button>

        </div>

    );

}
