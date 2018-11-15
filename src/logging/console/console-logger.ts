

export class ConsoleLogger {
    constructor(private name: string) {

    }

    Debug(value): ConsoleLogger {
        if (typeof value === 'object') {
            console.log(this.getTime(), this.name, JSON.parse(JSON.stringify(value)));
        } else {
            console.log(this.getTime(), this.name, value);
        }
        return this;
    }

    Warn(value): ConsoleLogger {
        if (typeof value === 'object') {
            console.warn(this.getTime(), this.name, JSON.parse(JSON.stringify(value)));
        } else {
            console.warn(this.getTime(), this.name, value);
        }
        return this;
    }

    Error(value): ConsoleLogger {
        if (typeof value === 'object') {
            console.error(this.getTime(), this.name, JSON.parse(JSON.stringify(value)));
        } else {
            console.error(this.getTime(), this.name, value);
        }
        return this;
    }
    private getTime(): string {
        let date = new Date();
        return `[${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds()}.${date.getMilliseconds().toString().padStart(3, '0')}]`;
    }
}
