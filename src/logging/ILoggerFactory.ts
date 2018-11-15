import { ILogger } from './ILogger';
import { ILoggerProvider } from './ILoggerProvider';

export interface ILoggerFactory {
    /** Create a logger */
    CreateLogger(name: string): ILogger;
    /** Add an logger provider to the logging system */
    AddProvider(provider: ILoggerProvider): void;
}