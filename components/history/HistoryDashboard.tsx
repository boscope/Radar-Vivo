import HistoryList from "./HistoryList";
import HistorySearch from "./HistorySearch";
import HistoryToolbar from "./HistoryToolbar";
import { mockHistory } from "@/lib/history/mock-history";

export default function HistoryDashboard(){

    return(

        <section className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold">

                    Histórico de Empresas

                </h2>

                <p className="text-gray-500">

                    Empresas analisadas pelo Radar Vivo.

                </p>

            </div>

            <HistorySearch/>

            <HistoryToolbar/>

            <HistoryList

                items={mockHistory}

            />

        </section>

    );

}
