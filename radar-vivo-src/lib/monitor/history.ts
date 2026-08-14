import type {
  MonitorHistory,
  MonitorEvent,
} from "./types";

export function addHistoryEvent(

  history: MonitorHistory,

  event: MonitorEvent

): MonitorHistory {

  return {

    ...history,

    events: [

      event,

      ...history.events,

    ],

  };

}
