export interface ScannerHealth {

  status: "healthy";

  version: string;

}

export function scannerHealth():
ScannerHealth {

  return {

    status: "healthy",

    version: "1.0.0",

  };

}
