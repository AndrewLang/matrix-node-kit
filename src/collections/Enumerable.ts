import { IEnumerable, EnumerableIterator } from './IEnumerable';

export class Enumerable<T> implements IEnumerable<T> {
    private items: T[] = [];

    /** Get counts of collection */
    get Count(): number {
        return this.Items.length;
    }
    /** Get all items */
    get Items(): T[] {
        return this.items;
    }
    /** Set items value */
    set Items(value: T[]) {
        this.items = value;
    }

    [Symbol.iterator](): any {
        return new EnumerableIterator(this);
    }

    static From<T>(array: Array<T>): IEnumerable<T> {
        let list = new Enumerable<T>();
        if (array) {
            list.Items = array;
        }
        return list;
    }
}