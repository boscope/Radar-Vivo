import type {
  Change,
} from "./change-detector";

export interface Alert {

  level:
    | "Baixo"
    | "Médio"
    | "Alto";

  message: string;

}

export function generateAlerts(
  changes: Change[]
): Alert[] {

  return changes.map(change => ({

    level: "Médio",

    message:
      `${change.field} sofreu alteração.`,

  }));

}
