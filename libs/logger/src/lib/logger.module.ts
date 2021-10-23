/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoggerConfig } from './logger.config';
import { DefaultLogFormatter, LogFormatter } from './log-formatter';
import { ConsoleLogAppender, LogAppender } from './log-appender';
import { LoggerService } from './logger.service';

const DEFAULT_CONFIG: LoggerConfig = {
  enableDebug: true,
  formatter: DefaultLogFormatter
};

@NgModule({
  providers: [
    LoggerService
  ]
})
export class LoggerModule {

  // Setup
  static forRoot(config?: LoggerConfig): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LoggerConfig, useValue: config ?? DEFAULT_CONFIG },
        { provide: LogFormatter, useClass: config?.formatter ?? DefaultLogFormatter },
        { provide: LogAppender, useClass: config?.appender ?? ConsoleLogAppender }
      ]
    }
  }

}
