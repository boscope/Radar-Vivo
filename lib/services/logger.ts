export type LogLevel =
  | "info"
  | "warn"
  | "error";

export interface LogEntry {

  level: LogLevel;

  message: string;

  createdAt: Date;

}

export function createLog(

  level: LogLevel,

  message: string

): LogEntry {

  return {

    level,

    message,

    createdAt: new Date(),

  };

}
