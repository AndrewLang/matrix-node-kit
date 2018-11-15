import { ILoggerProvider } from '../ILoggerProvider';
import { ILogger } from '../ILogger';
import { DebugLogger } from './DebugLogger';
import { LogLevel } from '../LogLevel';

export class DebugLoggerProvider implements ILoggerProvider {

    constructor(private filter?: (message: string, level: LogLevel) => boolean) {
        if (!filter) {
            filter = (message: string, level: LogLevel): boolean => {
                return true;
            };
        }
    }

    CreateLogger(name: string): ILogger {
        return new DebugLogger(name, this.filter);
    }

    Dispose(): void {

    }
}