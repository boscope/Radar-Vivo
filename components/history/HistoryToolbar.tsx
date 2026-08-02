export default function HistoryToolbar(){

    return(

        <div className="flex flex-wrap gap-3 justify-between items-center">

            <div className="flex gap-2">

                <button className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">

                    Todos

                </button>

                <button className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition">

                    Favoritos

                </button>

            </div>

            <select
                className="border rounded-lg px-4 py-2"
                defaultValue="score"
            >

                <option value="score">

                    Ordenar por Score

                </option>

                <option value="potential">

                    Ordenar por Potencial

                </option>

                <option value="date">

                    Última análise

                </option>

            </select>

        </div>

    );

}
