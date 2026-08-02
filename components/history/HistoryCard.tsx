import { HistoryItem } from "@/lib/history/types";

export default function HistoryCard({

    item,

}:{

    item:HistoryItem;

}){

    return(

        <div className="border rounded-xl bg-white shadow p-5">

            <div className="flex justify-between">

                <h3 className="font-bold text-lg">

                    {item.company}

                </h3>

                <span>

                    ⭐ {item.score}

                </span>

            </div>

            <p>

                {item.city}

            </p>

            <p>

                {item.category}

            </p>

            <p>

                Potencial:

                <strong>

                    {" "}

                    {item.potential}

                </strong>

            </p>

            <p>

                Prioridade:

                <strong>

                    {" "}

                    {item.priority}

                </strong>

            </p>

        </div>

    );

}
