import { ActionPlan } from "@/src/core/intelligence/recommendation/action-plan-engine";

interface Props{
  plans:ActionPlan[];
}

export default function ActionPlanCard({plans}:Props){

  return(

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        Plano de Ação de Hoje

      </h2>

      <div className="space-y-4">

        {plans.map((plan,index)=>(

          <div
            key={index}
            className="border rounded-xl p-4"
          >

            <div className="font-bold text-lg">

              {plan.title}

            </div>

            <div className="text-gray-600 mt-1">

              {plan.description}

            </div>

            <div className="mt-3 text-sm font-semibold">

              Prioridade: {plan.priority}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
