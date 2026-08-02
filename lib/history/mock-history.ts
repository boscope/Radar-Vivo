import { HistoryItem } from "./types";

export const mockHistory:HistoryItem[]=[

    {

        id:"1",

        company:"Padaria Central",

        city:"Recife",

        category:"Padaria",

        score:92,

        potential:"ALTO",

        priority:"ALTA",

        createdAt:"2026-07-26",

        favorite:true,

    },

    {

        id:"2",

        company:"Clínica Vida",

        city:"Olinda",

        category:"Clínica",

        score:81,

        potential:"ALTO",

        priority:"MÉDIA",

        createdAt:"2026-07-25",

        favorite:false,

    },

    {

        id:"3",

        company:"Auto Center Brasil",

        city:"Jaboatão",

        category:"Oficina",

        score:74,

        potential:"MÉDIO",

        priority:"MÉDIA",

        createdAt:"2026-07-24",

        favorite:false,

    }

];
