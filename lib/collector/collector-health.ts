export interface CollectorHealth {

  status: "healthy";

  version: string;

}

export function collectorHealth():
CollectorHealth {

  return {

    status: "healthy",

    version: "1.0.0",

  };

}
