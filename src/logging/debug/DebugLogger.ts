
import { LoggerBase } from '../LoggerBase';
import { LogLevel } from '../LogLevel';

export class DebugLogger extends LoggerBase {

    constructor(name: string, private filter?: (message: string, levle: LogLevel) => boolean) {
        super();
        this.Name = name;
    }

    /**
     * Peform log output to console
     * @param level 
     * @param eventId 
     * @param state 
     * @param error 
     * @param formatter 
     */
    Log(level: LogLevel, eventId: number, state: any, error: Error, formatter: (any: any, Error: any) => string) {
        let timestamp = this.getTime();
        if (typeof state === 'object') {
            console.log(timestamp, this.Name, JSON.parse(JSON.stringify(state)));
        } else {
            console.log(timestamp, this.Name, state);
        }
    }

    private getTime(): string {
        let date = new Date();
        return `[${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds()}.${date.getMilliseconds().toString().padStart(3, '0')}]`;
    }
}