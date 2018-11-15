import { ICollection, Collection } from './ICollection';

export interface IList<T> extends ICollection<T> {
    /** Get index of given item */
    IndexOf(item: T): number;
    /** Insert item to given index */
    Insert(index: number, item: T): void;
    /** Remove item at given index */
    RemoveAt(index: number): void;
}

export class List<T> extends Collection<T> implements IList<T> {
    /** Get index of given item */
    IndexOf(item: T): number {
        if (!item)
            throw new Error(`Argument 'item' is null.`);
        return this.Items.indexOf(item);
    }
    /** Insert item to given index */
    Insert(index: number, item: T): void {
        if (!item)
            throw new Error(`Argument 'item' is null.`);
        if (index < 0 || index >= this.Items.length)
            throw new Error(`Argument 'index' is out of index`);

        this.Items.splice(index, 0, item);
    }
    /** Remove item at given index */
    RemoveAt(index: number): void {
        if (index < 0 || index >= this.Items.length)
            throw new Error(`Argument 'index' is out of index`);

        this.Items.splice(index, 1);
    }
}