type Props = {
    score:number;
    probability:number;
    priority:string;
    potential:string;
};

export default function ExecutiveSummary({

    score,
    probability,
    priority,
    potential,

}:Props){

    return(

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            <Card
                title="Radar Score"
                value={`${score}/100`}
                color="bg-blue-600"
            />

            <Card
                title="Chance de Fechamento"
                value={`${probability}%`}
                color="bg-green-600"
            />

            <Card
                title="Potencial"
                value={potential}
                color="bg-purple-600"
            />

            <Card
                title="Prioridade"
                value={priority}
                color="bg-orange-600"
            />

        </div>

    );

}

function Card({

    title,
    value,
    color,

}:{

    title:string;
    value:string;
    color:string;

}){

    return(

        <div
            className="rounded-xl shadow-lg border bg-white overflow-hidden"
        >

            <div className={`${color} text-white px-4 py-2 font-semibold`}>

                {title}

            </div>

            <div className="text-center py-8">

                <h2 className="text-3xl font-bold">

                    {value}

                </h2>

            </div>

        </div>

    );

}
