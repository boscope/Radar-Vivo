type Props = {
    services:string[];
    argumentsList:string[];
    nextAction:string;
};

export default function CommercialPanel({

    services,
    argumentsList,
    nextAction,

}:Props){

    return(

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

            <Section
                title="Serviços Recomendados"
            >
                <ul className="space-y-2">

                    {services.map((item,index)=>(

                        <li
                            key={index}
                            className="bg-gray-100 rounded-lg px-3 py-2"
                        >
                            {item}
                        </li>

                    ))}

                </ul>
            </Section>

            <Section
                title="Argumentos Comerciais"
            >
                <ul className="space-y-2">

                    {argumentsList.map((item,index)=>(

                        <li
                            key={index}
                            className="bg-blue-50 rounded-lg px-3 py-2"
                        >
                            {item}
                        </li>

                    ))}

                </ul>
            </Section>

            <Section
                title="Próxima Ação"
            >

                <div className="text-lg font-semibold text-center py-10">

                    {nextAction}

                </div>

            </Section>

        </div>

    );

}

function Section({

    title,
    children,

}:any){

    return(

        <div className="border rounded-xl bg-white shadow">

            <div className="bg-slate-900 text-white px-4 py-3 rounded-t-xl font-semibold">

                {title}

            </div>

            <div className="p-4">

                {children}

            </div>

        </div>

    );

}
