import { IEnumerable } from './IEnumerable';
import { Enumerable } from './Enumerable';
import { KeyValuePair } from './KeyValuePair';

export interface IDictionary<TKey, TValue> extends IEnumerable<KeyValuePair<TKey, TValue>> {
    Add(key: TKey, value: TValue): void;
    ContainsKey(key: TKey): boolean;
    Item(key: TKey): TValue | undefined;
    Keys(): TKey[];
    Values(): TValue[];
    Remove(key: TKey): boolean;
}


export class Dictionary<TKey, TValue> extends Enumerable<KeyValuePair<TKey, TValue>> implements IDictionary<TKey, TValue> {
    private map = new Map<TKey, TValue>();


    Add(key: TKey, value: TValue): void {
        this.map.set(key, value);
        this.Items.push(new KeyValuePair(key, value));
    }
    ContainsKey(key: TKey): boolean {
        return this.map.has(key);
    }

    Item(key: TKey): TValue | undefined {
        return this.map.get(key);
    }
    Keys(): TKey[] {
        let keys: TKey[] = [];

        this.map.forEach((value, key) => {
            keys.push(key);
        })
        return keys;
    }
    Remove(key: TKey): boolean {
        let index = this.Items.findIndex(x => x.Key === key);
        if (index > 0) {
            this.Items.splice(index, 1);
        }
        return this.map.delete(key);
    }
    Values(): TValue[] {
        let values: TValue[] = [];
        this.map.forEach((value, key) => {
            values.push(value);
        })
        return values;
    }
}