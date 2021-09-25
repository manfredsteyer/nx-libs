import { Injectable } from '@angular/core';

export abstract class LogFormatter {
  abstract format(message: string): string;
}

@Injectable({
  providedIn: 'root'
})
export class DefaultLogFormatter implements LogFormatter {
  format(message: string): string {
    return message;
  }
}
