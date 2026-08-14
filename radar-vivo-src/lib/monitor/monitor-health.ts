export interface MonitorHealth {

  status: "healthy";

  version: string;

}

export function monitorHealth():
MonitorHealth {

  return {

    status: "healthy",

    version: "1.0.0",

  };

}
