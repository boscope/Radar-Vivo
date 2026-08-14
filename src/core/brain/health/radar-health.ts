export interface RadarHealth {

  version: string;

  status: "ONLINE" | "DEGRADED" | "OFFLINE";

  generatedAt: Date;

  uptime: number;

}

export function getRadarHealth(): RadarHealth {

  return {

    version: "1.0.0-beta",

    status: "ONLINE",

    generatedAt: new Date(),

    uptime: process.uptime()

  };

}
