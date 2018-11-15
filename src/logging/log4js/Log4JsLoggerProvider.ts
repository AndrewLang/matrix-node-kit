import { ILoggerProvider } from '../ILoggerProvider';
import { ILogger } from '../ILogger';
import { Log4JsLogger } from './Log4JsLogger';
import { Directory } from '../../io/index';
import * as log4js from 'log4js';
import * as os from 'os';

export class Log4JsLoggerProvider implements ILoggerProvider {

    constructor(initializer?: () => void, appName = 'app', logFileName = 'log.txt') {

        if (initializer) {
            initializer();
        } else {
            try {
                let folder = Directory.Combine( os.homedir(), os.userInfo().username, appName );
                Directory.EnsureFolderExist(folder);
                let file = Directory.Combine(folder, logFileName);

                log4js.configure({
                    appenders: {
                        file: { type: 'file', filename: file, maxLogSize: 20480, backups: 2 },
                        console: { type: 'console', layout: { type: 'basic' } }
                    },
                    categories: {
                        default: { appenders: ['console', 'file'], level: 'debug' }
                    }
                });
            } catch (e) {
                console.log('Not node runtime, initialize Log4JS failed.');
            }
        }
    }

    /**
     * Create logger 
     * @param name logger name
     */
    CreateLogger(name: string): ILogger {
        let loggerName = name ? name : 'Default';
        let log4Logger = log4js.getLogger(loggerName);

        return new Log4JsLogger(loggerName, log4Logger);
    }

}