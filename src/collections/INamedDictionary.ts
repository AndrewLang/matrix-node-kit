
export interface INamedDictionary<T> {
    Add(key: string, value: T): void;
    ContainsKey(key: string): boolean;
    Count(): number;
    Item(key: string): T;
    Keys(): string[];
    Remove(key: string): boolean;
    Values(): T[];
}


export class NamedDictionary<T> implements INamedDictionary<T> {
    private items = new Map<string, T>();

    private count = 0;

    public ContainsKey(key: string): boolean {
        return this.items.has(key);
    }

    public Count(): number {
        return this.items.keys.length;
    }

    public Add(key: string, value: T) {
        this.items.set(key, value);
    }

    public Remove(key: string): boolean {
        return this.items.delete(key);
    }

    public Item(key: string): T {
        return this.items.get(key);
    }

    public Keys(): string[] {
        let keys = [];

        this.items.forEach((value, key) => {
            keys.push(key);
        })
        return keys;
    }

    public Values(): T[] {
        let values = [];
        this.items.forEach((value, key) => {
            values.push(value);
        });
        return values;
    }
}