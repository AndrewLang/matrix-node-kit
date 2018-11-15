import { ILogger } from './ILogger';
import { DefaultLoggerFactory } from './DefaultLoggerFactory';
import { LogLevel } from './LogLevel';
import * as Collections from '../collections/index';
import { ILoggerProvider } from './ILoggerProvider';

export class Logger implements ILogger {
    private loggers = new Collections.List<ILogger>();
    private formatter: (any: any, Error: any) => string = this.MessageFormatter;

    constructor(private loggerFactory: DefaultLoggerFactory, private name: string) {

        let providers = loggerFactory.GetProviders();
        if (providers.Count > 0) {
            providers.ForEach(x => {
                this.loggers.Add(x.CreateLogger(name));
            });
        }
    }

    /** Aggregates most logging patterns to a single method. */
    Log(level: LogLevel, eventId: number, state: any, error: Error | null, formatter: (any: any, Error: any) => string) {

        let errors = new Collections.List<Error>();

        this.loggers.ForEach(logger => {
            try {
                logger.Log(level, eventId, state, error, formatter);
            } catch (error) {
                errors.Add(error);
            }
        });
    }

    /**
     * Checks if the given LogLevel is enabled.
     */
    IsEnabled(level: LogLevel): boolean {
        for (let logger of this.loggers.Items) {
            if (logger.IsEnabled(level))
                return true;
        }

        return false;
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

    /**
     * Add a logger provider
     * @provider
     */
    AddProvider(provider: ILoggerProvider): void {
        let logger = provider.CreateLogger(this.name);

        this.loggers.Add(logger);
    }

    private MessageFormatter(state: any, error: Error): string {
        if (!state && !error)
            return '';

        if (!state)
            return error.message;

        if (!error)
            return state.toString();

        return `${state}\n${error}`;
    }
}