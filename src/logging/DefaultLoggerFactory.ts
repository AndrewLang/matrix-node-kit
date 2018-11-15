import { ILoggerFactory } from './ILoggerFactory';
import { ILogger } from './ILogger';
import { ILoggerProvider } from './ILoggerProvider';
import { Logger } from './Logger';

import * as Collections from '../collections/index';

export class DefaultLoggerFactory implements ILoggerFactory {

    private providers = new Collections.List<ILoggerProvider>();
    private loggers = new Collections.Dictionary<string, Logger>();

    constructor() { }

    /** Create a logger */
    CreateLogger(name: string): ILogger {
        let logger = this.loggers.Item(name);

        if (!logger) {
            logger = new Logger(this, name);
            this.loggers.Add(name, logger);
        }

        return logger;
    }

    /** 
     * Add an logger provider to the logging system
     * @provider logger provider
     */
    AddProvider(provider: ILoggerProvider): void {
        this.providers.Add(provider);

        for (let item of this.loggers.Items) {
            item.Value.AddProvider(provider);
        }
    }
    /**
     * Get logger providers
     */
    GetProviders(): Collections.IList<ILoggerProvider> {
        return this.providers;
    }
}