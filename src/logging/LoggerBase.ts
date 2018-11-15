import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';

export abstract class LoggerBase implements ILogger {
    private name: string;
    protected formatter: (any: any, Error: any) => string = this.MessageFormatter;

    constructor() {

    }

    /** Aggregates most logging patterns to a single method. */
    abstract Log(level: LogLevel, eventId: number, state: any, error: Error | null, formatter: (any: any, Error: any) => string): void;

    protected get Name(): string {
        return this.name;

    }
    protected set Name(value: string) {
        this.name = value;
    }
    /**
     * Checks if the given LogLevel is enabled.
     */
    IsEnabled(level: LogLevel): boolean {
        return true;
    }

    /** Log to Debug level */
    Debug(message: any): ILogger {
        this.Log(LogLevel.Debug, 0, message, null, this.formatter);
        return this;
    }
    /** Log to Trace level */
    Trace(message: any): ILogger {
        this.Log(LogLevel.Trace, 0, message, null, this.formatter);
        return this;
    }
    /** Log to Info level */
    Info(message: any): ILogger {
        this.Log(LogLevel.Information, 0, message, null, this.formatter);
        return this;
    }
    /** Log to Warn level */
    Warn(message: any): ILogger {
        this.Log(LogLevel.Warning, 0, message, null, this.formatter);
        return this;
    }
    /** Log to Error level */
    Error(message: any): ILogger {
        this.Log(LogLevel.Error, 0, message, null, this.formatter);
        return this;
    }
    /** Log to Fatal level */
    Fatal(message: any): ILogger {
        this.Log(LogLevel.Critical, 0, message, null, this.formatter);
        return this;
    }

    protected MessageFormatter(state: any, error: Error): string {
        if (!state && !error)
            // throw new Error(`No message or exception details wer found to create a message for the log.`);
            return '';

        if (!state)
            return error.message;

        if (!error)
            return JSON.stringify(state); // state.toString();

        return `${state}\n${error}`;
    }
}