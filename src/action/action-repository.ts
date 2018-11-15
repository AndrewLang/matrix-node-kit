import { List, IEnumerable } from './imports';
import { IAction } from './action';

export interface IActionRepository {
    readonly Actions: List<IAction>;

    Register(action: IAction): IActionRepository;
    Find(expression: (action: IAction) => boolean): IEnumerable<IAction>;
    FindOne(name: string): IAction;
    InvokeActions(expression: (action: IAction) => boolean, args?: any): void;
}


export class ActionRepository implements IActionRepository {
    readonly Actions = new List<IAction>();

    Register(action: IAction): ActionRepository {
        if (action) {
            this.Actions.Add(action);
        }
        return this;
    }

    Find(expression: (action: IAction) => boolean): IEnumerable<IAction> {
        return this.Actions.FindAll(expression);
    }

    FindOne(name: string): IAction {
        return this.Actions.FirstOrDefault(x => x.Name === name);
    }
    InvokeActions(expression: (action: IAction) => boolean, args?: any): void {
        this.Find(expression)
            .ForEach(x => {
                x.Invoke(args);
            });
    }

}