import { ILoggerFactory } from './ILoggerFactory';
import { DefaultLoggerFactory } from './DefaultLoggerFactory';
import { DebugLoggerProvider } from './debug/DebugLoggerProvider';
import { Log4JsLoggerProvider } from './log4js/Log4JsLoggerProvider';

/** Extension method implementation in TypeScript
 * 1. create extension methods class, method declared as static
 * 2. declare module for the type to be extented
 * 3. hook the method delcaration to implementation
 */

/**
 * Extension methods for LoggerFactory
 */
export class LoggerFactoryExtensions {
    /**
     * Add Debugger to logger
     * @param this ILoggerFactory instance
     */
    static AddDebug(this: ILoggerFactory): ILoggerFactory {
        let provider = new DebugLoggerProvider();
        this.AddProvider(provider);
        return this;
    }
    /**
    * Add Log4JS to logging 
    * @param this ILoggerFactory instance
    */
    static AddLog4Js(this: ILoggerFactory): ILoggerFactory;
    static AddLog4Js(this: ILoggerFactory, initializer?: () => void, appName = '', logFileName = 'log.txt'): ILoggerFactory {
        let provider = new Log4JsLoggerProvider(initializer, appName, logFileName);
        this.AddProvider(provider);
        return this;
    }
}

/** Exten type of the implementation */
declare module './DefaultLoggerFactory' {
    interface DefaultLoggerFactory {
        AddDebug: () => ILoggerFactory;
        AddLogJs: (initializer?: () => void, logFileName?: string) => ILoggerFactory;
    }
}

/** Extend type of the interface */
declare module './ILoggerFactory' {
    interface ILoggerFactory {
        AddDebug: () => ILoggerFactory;
        AddLogJs: (initializer?: () => void, logFileName?: string) => ILoggerFactory;
    }
}

/** hook defination to the implementation */
DefaultLoggerFactory.prototype.AddLogJs = LoggerFactoryExtensions.AddLog4Js;
DefaultLoggerFactory.prototype.AddDebug = LoggerFactoryExtensions.AddDebug;
