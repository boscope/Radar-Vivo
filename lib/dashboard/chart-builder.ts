export interface DashboardChart {

  labels: string[];

  values: number[];

}

export function buildChart():
DashboardChart {

  return {

    labels: [

      "Seg",

      "Ter",

      "Qua",

      "Qui",

      "Sex",

      "Sáb",

      "Dom",

    ],

    values: [

      0,

      0,

      0,

      0,

      0,

      0,

      0,

    ],

  };

}
