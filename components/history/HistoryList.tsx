import HistoryCard from "./HistoryCard";
import { HistoryItem } from "@/lib/history/types";

export default function HistoryList({

    items,

}:{

    items:HistoryItem[];

}){

    if(items.length===0){

        return(

            <div className="border rounded-xl bg-white p-10 text-center text-gray-500">

                Nenhuma empresa analisada.

            </div>

        );

    }

    return(

        <div className="grid gap-5">

            {items.map(item=>(

                <HistoryCard

                    key={item.id}

                    item={item}

                />

            ))}

        </div>

    );

}
