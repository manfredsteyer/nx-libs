import { Injectable } from '@angular/core';

export type LogLevel = 'DEBUG' | 'LOG'; 

export abstract class LogAppender {
  abstract append(level: LogLevel, message: string): void;
}

@Injectable()
export class ConsoleLogAppender implements LogAppender {
    append(level: LogLevel, message: string): void {
        if (level === 'DEBUG') {
            // eslint-disable-next-line no-restricted-syntax
            console.debug(message);
        }
        else {
            console.log(message);
        }
    }
}
