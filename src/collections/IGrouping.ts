import { IEnumerable } from './IEnumerable';
import { Enumerable } from './Enumerable';


export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
    readonly Key: TKey;
}

export class Grouping<TKey, TElement> extends Enumerable<TElement> implements IGrouping<TKey, TElement> {
    private key: TKey;


    constructor(key?: TKey, elements?: IEnumerable<TElement>) {
        super();
        if (key)
            this.key = key;
        if (elements)
            this.Items = elements.Items;
    }

    get Key(): TKey {
        return this.key;
    }
    set Key(value: TKey) {
        this.key = value;
    }

}