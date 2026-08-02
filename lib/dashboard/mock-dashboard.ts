export type DashboardData={

    score:number;

    probability:number;

    priority:string;

    potential:string;

    services:string[];

    argumentsList:string[];

    nextAction:string;

};

export function getDashboardData():DashboardData{

    return{

        score:92,

        probability:87,

        priority:"ALTA",

        potential:"ALTO",

        services:[

            "Google Meu Negócio",

            "SEO Local",

            "Landing Page",

            "WhatsApp IA",

            "Automação Comercial"

        ],

        argumentsList:[

            "Empresa possui excelente potencial de crescimento.",

            "Pouca presença digital identificada.",

            "Existe oportunidade imediata de geração de leads.",

            "Concorrentes utilizam mais tecnologia.",

            "Cliente demonstra alta prioridade comercial."

        ],

        nextAction:

            "Entrar em contato nas próximas 24 horas."

    };

}
