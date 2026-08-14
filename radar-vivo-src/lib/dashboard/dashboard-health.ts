export interface DashboardHealth {

  status: "healthy";

  version: string;

}

export function dashboardHealth():
DashboardHealth {

  return {

    status: "healthy",

    version: "1.0.0",

  };

}
