import type {

  CompanyHistory,
  CompanySnapshot,

} from "./types";

export function saveSnapshot(

  history: CompanyHistory,

  snapshot: CompanySnapshot

): CompanyHistory {

  return {

    ...history,

    snapshots: [

      ...history.snapshots,

      snapshot,

    ],

  };

}