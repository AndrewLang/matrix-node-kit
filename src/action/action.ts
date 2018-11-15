export interface IAction {
    Name?: string;
    Group?: string;
    Tag?: any;

    Invoke(args?: any): void;
}

export class Action implements IAction {
    Name: string;
    Group: string;
    Tag: any;

    constructor(private delegate: (args?: any) => void) { }

    Invoke(args?: any): void {
        if (this.delegate) {
            this.delegate(args);
        }
    }
}
