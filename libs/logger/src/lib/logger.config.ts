import { Type } from "@angular/core";
import { LogAppender } from "./log-appender";
import { LogFormatter } from "./log-formatter";

export abstract class LoggerConfig {
  abstract enableDebug: boolean;
  abstract formatter?: Type<LogFormatter>;
  abstract appender?: Type<LogAppender>;
}