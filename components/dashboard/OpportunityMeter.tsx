type Props={

    score:number;

};

export default function OpportunityMeter({

    score,

}:Props){

    const color=

        score>=80
            ?"bg-green-500"
        :score>=60
            ?"bg-yellow-500"
            :"bg-red-500";

    return(

        <div className="bg-white rounded-xl shadow border p-6">

            <div className="flex justify-between mb-3">

                <span className="font-semibold">

                    Opportunity Score

                </span>

                <span className="font-bold">

                    {score}/100

                </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-5">

                <div

                    className={`${color} h-5 rounded-full transition-all duration-700`}

                    style={{

                        width:`${score}%`

                    }}

                />

            </div>

        </div>

    );

}
