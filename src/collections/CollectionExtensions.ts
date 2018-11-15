import { IEnumerable } from './IEnumerable';
import { Enumerable } from './Enumerable';
import { IGrouping, Grouping } from './IGrouping';
import { Dictionary } from './IDictionary';
import { IList, List } from './IList';


export class CollectionExtensions {
    /** Do ForEach on items */
    static ForEach<T>(this: IEnumerable<T>, action: (item: T) => void): void {
        if (!action) {
            throw new Error(`Argument 'item' is null.`);
        }

        for (let item of this.Items) {
            action(item);
        }
    }
    /** Sort items by given comparer */
    static Sort<T>(this: IEnumerable<T>, comparer: (x: T, y: T) => number): void {
        if (!comparer) {
            throw new Error(`Argument 'comparer' is null.`);
        }

        this.Items = this.Items.sort(comparer);
    }
    /** Find items by given predicate */
    static FindAll<T>(this: IEnumerable<T>, predicate: (item: T) => boolean): IEnumerable<T> {
        if (!predicate) {
            throw new Error(`Argument 'predicate' is null.`);
        }

        let result = new List<T>();
        for (let item of this.Items) {
            if (predicate(item)) {
                result.Add(item);
            }
        }

        return Enumerable.From(result.Items);
    }
    /** Find first item in the list */
    static FirstOrDefault<T>(this: IEnumerable<T>, predicate?: (item: T) => boolean): T {

        let result: T;

        result = this.Items.FirstOrDefault(predicate);

        return result;
    }
    static IsEmpty<T>(this: IEnumerable<T>): boolean {
        return !(this.Items && this.Items.length > 0);
    }
    static Any<T>(this: IEnumerable<T>, predicate?: (source: any) => boolean): boolean {
        if (predicate) {
            for (let item of this.Items) {
                if (predicate(item)) {
                    return true;
                }
            }
            return false;
        } else {
            if (this.Items.length === 0) {
                return false;
            }
            return true;
        }
    }
    static Max<T>(this: IEnumerable<T>, selector: (source: T) => number): number {

        let max = this.Select(selector).Items.reduce(function (a: number, b: number) {
            return Math.max(a, b);
        });
        return max;
    }
    static Min<T>(this: IEnumerable<T>, selector: (source: T) => any): number {
        let min = this.Select(selector).Items.reduce(function (a: number, b: number) {
            return Math.min(a, b);
        });
        return min;
    }
    static OrderBy<T>(this: IEnumerable<T>, keySelector: (source: T) => any): IEnumerable<T> {
        let values = this.Items.sort(function (a: any, b: any) {
            return keySelector(a) - keySelector(b);
        });

        return Enumerable.From(values);
    }
    static OrderByDescending<T>(this: IEnumerable<T>, keySelector: (source: T) => any): IEnumerable<T> {
        let values = this.Items.sort(function (a: any, b: any) {
            return keySelector(a) - keySelector(b);
        });

        return Enumerable.From(values);
    }
    static Where<T>(this: IEnumerable<T>, predicate: (source: T) => boolean): IEnumerable<T> {

        let values = this.Items.filter((x: any) => {
            return predicate(x);
        });
        return Enumerable.From(values);
    }
    static Select<TSource, TResult>(this: IEnumerable<TSource>, selector: (source: TSource) => TResult): IEnumerable<TResult> {
        let result = [];
        for (let item of this.Items) {
            result.push(selector(item));
        }
        return Enumerable.From(result);
    }
    static ElementAt<T>(this: IEnumerable<T>, index: number): T {
        let values = this.Items;
        return values[index];
    }
    static GroupBy<T, TKey, TElement>(this: IEnumerable<T>, keySelector: (source: T) => TKey, valueSelector?: (source: T) => any): IEnumerable<IGrouping<TKey, TElement>> {
        if (!this) {
            throw new Error(`Parameter is null`);
        }
        if (!keySelector) {
            throw new Error(`Parameter 'keySelelctor'is null`);
        }
        if (!valueSelector) {
            valueSelector = x => x;
        }

        let dictionary = new Dictionary<TKey, IList<TElement>>();

        this.ForEach(x => {
            let key = keySelector(x);
            let value = valueSelector ? valueSelector(x) : x;

            let values: IList<TElement>;
            if (dictionary.ContainsKey(key)) {
                let item = dictionary.Item(key);
                values = item ? item : new List<TElement>();
            } else {
                values = new List<TElement>();
                dictionary.Add(key, values);
            }
            values.Add(value);
        });

        let groups = new List<IGrouping<TKey, TElement>>();
        for(let item of dictionary.Items){
            groups.Add(new Grouping(item.Key, item.Value));
        }
        
        return groups;
    }

}

declare module './Enumerable' {
    interface Enumerable<T> {
        ForEach: (action: (item: T) => void) => void;
        Sort: (comparer: (x: T, y: T) => number) => void;
        FindAll: (predicate: (item: T) => boolean) => IEnumerable<T>;
        FirstOrDefault: (predicate?: (item: T) => boolean) => T;
        IsEmpty: () => boolean;
        Any: (predicate?: (source: any) => boolean) => boolean;
        Max: (selector: (source: T) => any) => number;
        Min: (selector: (source: T) => any) => number;
        OrderBy: (keySelector: (source: T) => any) => IEnumerable<T>;
        OrderByDescending: (keySelector: (source: T) => any) => IEnumerable<T>;
        Where: (predicate: (source: T) => boolean) => IEnumerable<T>;
        Select: <T, TResult>(selector: (source: T) => TResult) => IEnumerable<TResult>;
        ElementAt: (index: number) => T;
        GroupBy: <TKey, TElement>  (keySelector: (source: T) => TKey, valueSelector?: (source: T) => TElement) => IEnumerable<IGrouping<TKey, TElement>>;
    }
}
declare module './IEnumerable' {
    interface IEnumerable<T> {
        ForEach: (action: (item: T) => void) => void;
        Sort: (comparer: (x: T, y: T) => number) => void;
        FindAll: (predicate: (item: T) => boolean) => IEnumerable<T>;
        FirstOrDefault: (predicate?: (item: T) => boolean) => T;
        IsEmpty: () => boolean;
        Any: (predicate?: (source: any) => boolean) => boolean;
        Max: (selector: (source: T) => any) => number;
        Min: (selector: (source: T) => any) => number;
        OrderBy: (keySelector: (source: T) => any) => IEnumerable<T>;
        OrderByDescending: (keySelector: (source: T) => any) => IEnumerable<T>;
        Where: (predicate: (source: T) => boolean) => IEnumerable<T>;
        Select: <T, TResult>(selector: (source: T) => TResult) => IEnumerable<TResult>;
        ElementAt: (index: number) => T;
        GroupBy: <TKey, TElement>  (keySelector: (source: T) => TKey, valueSelector?: (source: T) => TElement) => IEnumerable<IGrouping<TKey, TElement>>;
    }
}

Enumerable.prototype.ForEach = CollectionExtensions.ForEach;
Enumerable.prototype.Sort = CollectionExtensions.Sort;
Enumerable.prototype.FindAll = CollectionExtensions.FindAll;
Enumerable.prototype.FirstOrDefault = CollectionExtensions.FirstOrDefault;
Enumerable.prototype.IsEmpty = CollectionExtensions.IsEmpty;
Enumerable.prototype.Any = CollectionExtensions.Any;
Enumerable.prototype.Max = CollectionExtensions.Max;
Enumerable.prototype.Min = CollectionExtensions.Min;
Enumerable.prototype.OrderBy = CollectionExtensions.OrderBy;
Enumerable.prototype.OrderByDescending = CollectionExtensions.OrderByDescending;
Enumerable.prototype.Where = CollectionExtensions.Where;
Enumerable.prototype.Select = CollectionExtensions.Select;
Enumerable.prototype.ElementAt = CollectionExtensions.ElementAt;
Enumerable.prototype.GroupBy = CollectionExtensions.GroupBy;
