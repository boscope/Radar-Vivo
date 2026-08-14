export interface TimelineItem {

  phase: string;

  duration: string;

}

export function buildTimeline():
TimelineItem[] {

  return [

    {

      phase: "Diagnóstico",

      duration: "1 dia",

    },

    {

      phase: "Implantação",

      duration: "7 dias",

    },

    {

      phase: "Otimização",

      duration: "30 dias",

    },

  ];

}
