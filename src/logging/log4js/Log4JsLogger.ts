import { LogLevel } from '../LogLevel';
import { LoggerBase } from '../LoggerBase';


export class Log4JsLogger extends LoggerBase {

    constructor(name: string, private log4JsLogger: any) {
        super();
        this.Name = name;
    }

    /** Aggregates most logging patterns to a single method. */
    Log(level: LogLevel, eventId: number, state: any, error: Error, formatter: (any: any, Error: any) => string) {
        let message = this.formatter(state, error);

        switch (level) {
            case LogLevel.Debug:
                this.log4JsLogger.debug(message);
                break;
            case LogLevel.Trace:
                this.log4JsLogger.trace(message);
                break;
            case LogLevel.Information:
                this.log4JsLogger.info(message);
                break;
            case LogLevel.Warning:
                this.log4JsLogger.warn(message);
                break;
            case LogLevel.Error:
                this.log4JsLogger.error(message);
                break;
            case LogLevel.Critical:
                this.log4JsLogger.fatal(message);
                break;
            default:
                this.log4JsLogger.debug(message);
                break;
        }

    }
    /**
    * Checks if the given LogLevel is enabled.
    */
    IsEnabled(level: LogLevel): boolean {
        let rawLevel: any;
        switch (level) {
            case LogLevel.Debug:
                rawLevel = { level: 5000, levelStr: 'TRACE' };
                break;
            case LogLevel.Trace:
                rawLevel = { level: 10000, levelStr: 'DEBUG' };
                break;
            case LogLevel.Information:
                rawLevel = { level: 20000, levelStr: 'INFO' };
                break;
            case LogLevel.Warning:
                rawLevel = { level: 30000, levelStr: 'WARN' };
                break;
            case LogLevel.Error:
                rawLevel = { level: 40000, levelStr: 'ERROR' };
                break;
            case LogLevel.Critical:
                rawLevel = { level: 50000, levelStr: 'FATAL' };
                break;
            default:
                rawLevel = { level: 10000, levelStr: 'DEBUG' };
                break;
        }
        return this.log4JsLogger.isLevelEnabled(rawLevel);
    }
}