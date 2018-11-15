import { LogLevel } from './LogLevel';

export interface ILogger {
    /** Aggregates most logging patterns to a single method. */
    Log(level: LogLevel, eventId: number, state: any, error: Error | null, formatter: (any: any, Error: any) => string): void;

    /**
     * Checks if the given LogLevel is enabled.
     */
    IsEnabled(level: LogLevel): boolean;

    /** Log to Debug level */
    Debug(message: any): ILogger;
    /** Log to Trace level */
    Trace(message: any): ILogger;
    /** Log to Info level */
    Info(message: any): ILogger;
    /** Log to Warn level */
    Warn(message: any): ILogger;
    /** Log to Error level */
    Error(message: any): ILogger;
    /** Log to Fatal level */
    Fatal(message: any): ILogger;
}