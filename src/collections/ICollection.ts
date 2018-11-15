
import { IEnumerable } from './IEnumerable';
import { Enumerable } from './Enumerable';

export interface ICollection<T> extends IEnumerable<T> {

    /** Get whether collection is readonly */
    IsReadOnly: boolean;

    /** Add item to collection */
    Add(item: T): void;
    /** Add items to collection */
    AddRange(items: T[]): void;
    /** Clear collection */
    Clear(): void;
    /** Determines whether collection contains a specific item */
    Contains(item: T): boolean;
    /** Remove item from collection */
    Remove(item: T): boolean;
    /** Copy elements to an array starting at a particular index */
    CopyTo(array: T[], arrayIndex: number): void;
}


export class Collection<T> extends Enumerable<T> implements ICollection<T> {  

    /** Get whether collection is readonly */
    get IsReadOnly(): boolean {
        return false;
    }

    /** Add item to collection */
    Add(item: T): void {
        if (!item)
            throw new Error(`Argument 'item' is null.`);

        this.Items.push(item);
    }
    /** Add items to collection */
    AddRange(items: T[]): void {
        if (!items)
            throw new Error(`Argument 'items' is null.`);

        for (let item of items) {
            this.Add(item);
        }
    }
    /** Clear collection */
    Clear(): void {
        this.Items = [];
    }
    /** Determines whether collection contains a specific item */
    Contains(item: T): boolean {
        if (!item)
            throw new Error(`Argument 'item' is null.`);

        return this.Items.indexOf(item) > -1;
    }
    /** Remove item from collection */
    Remove(item: T): boolean {
        if (!item)
            throw new Error(`Argument 'item' is null.`);

        let index = this.Items.indexOf(item);
        if (index > -1) {
            this.Items.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
    /** 
     * Copy elements to an array starting at a particular index
     * @array
     * @arrayIndex The zero-based index in array at which copying begins.
     */
    CopyTo(array: T[], arrayIndex: number) {
        if (!array)
            throw new Error(`Argument 'array' is null.`);
        if (arrayIndex < 0 || arrayIndex > array.length)
            throw new Error(`Argument 'arrayIndex' is out of range.`);

        let index = arrayIndex;
        for (let item of this.Items) {
            array.splice(index++, 0, item);
        }

    }
}