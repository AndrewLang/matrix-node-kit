import { ILogger } from './ILogger';

export interface ILoggerProvider  {
    /** Create a new logger instance */
    CreateLogger(categoryName: string): ILogger;
}