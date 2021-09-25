import { Injectable } from "@angular/core";
import { LogFormatter } from "@my-project/logger";

@Injectable()
export class CustomLogFormatter implements LogFormatter {
    format(message: string): string {
        const date = new Date().toISOString();
        return `[${date}] ${message}`;
    }
}