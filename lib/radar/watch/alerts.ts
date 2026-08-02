import type {

  WatchAlert,

} from "./types";

export function createAlert(

  companyId: string,

  title: string,

  description: string,

  priority: WatchAlert["priority"]

): WatchAlert {

  return {

    companyId,

    title,

    description,

    priority,

    createdAt: new Date(),

  };

}