

interface Array<T> {
    Add: (item: T) => void;
    Empty: () => Array<any>;
    IsEmpty: () => boolean;
    Any: (predicate?: (source: T) => boolean) => boolean;
    Count: () => number;
    Max: () => number;
    Min: () => number;
    OrderBy: (keySelector: (source: T) => any) => Array<T>;
    OrderByDescending: (keySelector: (source: T) => any) => Array<T>;
    Where: (predicate: (source: T) => boolean) => Array<T>;
    Select: <TResult>(selector: (source: T) => TResult) => Array<TResult>;
    ElementAt: (index: number) => any;
    FirstOrDefault: (predicate?: (source: T) => boolean) => T;
    ForEach: (callback: Function) => void;
    Remove: (item: any) => any;
    Contains: (partial: string, strict: boolean) => boolean;
    IndexOfPartial: (partial: string) => number;
    ToObjectArray: (objName: string) => Array<any>;
}


Array.prototype.Add = function (item: any): Array<any> {
    this.push(item);
    return this;
};
Array.prototype.Empty = function (): Array<any> {
    return this.splice(0, this.length);
};
Array.prototype.IsEmpty = function (): boolean {
    if (this.length === 0) {
        return true;
    }
    return false;
};
Array.prototype.ElementAt = function (index: number): any {
    return this[index];
};
Array.prototype.FirstOrDefault = function (predicate?: (source: any) => boolean): any {
    let result = null;

    if (predicate) {
        for (let item of this) {
            if (predicate(item)) {
                result = item;
                break;
            }
        }
    } else {
        result = this[0];
    }

    return result;
};
Array.prototype.Max = function (): number {
    let max = this.reduce(function (a: number, b: number) {
        return Math.max(a, b);
    });
    return max;
};
Array.prototype.Min = function (): number {
    let min = this.reduce(function (a: number, b: number) {
        return Math.min(a, b);
    });
    return min;
};
Array.prototype.Count = function (): number {
    return this.length;
};
Array.prototype.Any = function (predicate?: (source: any) => boolean): boolean {
    if (predicate) {
        for (let item of this) {
            if (predicate(item))
                return true;
        }
        return false;
    } else {
        if (this.length === 0) {
            return false;
        }
        return true;
    }

};
Array.prototype.Where = function (predicate: (source: any) => boolean): Array<any> {
    return this.filter((x: any) => {
        return predicate(x);
    });
};
Array.prototype.Select = function <TResult>(selector: (source: any) => TResult): Array<TResult> {
    let result = [];
    for (let item of this) {
        result.push(selector(item));
    }
    return result;
};
Array.prototype.OrderBy = function (keySelector: (source: any) => any): Array<any> {
    return this.sort(function (a: any, b: any) {
        return keySelector(a) - keySelector(b);
    });
};
Array.prototype.OrderByDescending = function (keySelector: (source: any) => any): Array<any> {
    return this.sort(function (a: any, b: any) {
        return keySelector(b) - keySelector(a);
    });
};
Array.prototype.ForEach = function (callback: Function): void {
    for (let i = 0; i < this.length; i++) {
        callback(i, this[i]);
    }
};
Array.prototype.Remove = function (item: any): any {
    let index = this.indexOf(item);
    if (index !== -1) {
        return this.splice(index, 1);
    }
    return null;
};
Array.prototype.Contains = function (partial: string, strict: boolean): boolean {
    for (let i = 0; i < this.length; i++) {
        if (!strict && this[i].contains(partial)) {
            return true;
        }
        if (strict && this[i] === partial) {
            return true;
        }
    }
    return false;
};
Array.prototype.IndexOfPartial = function (partial: string) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].contains(partial)) {
            return i;
        }
    }
    return -1;
};
/*
 * There are frameworks that auto-generate JSON based on data schemas, but sometimes they
 * return data in inconsistent ways. For example, an array of strings might be returned
 * instead of an array of objects containing strings, etc. because the underlying data at the time
 * only cotains the string value, but when other data is present (in the database, etc.),
 * it will return the object array. Certain convenience methods are necessary to force proper formatting.
 */

Array.prototype.ToObjectArray = function (objName: string): Array<any> {
    if (objName === undefined || objName === null) {
        throw new Error('Error: Property name must be provided for conversion.');
    }
    let items: any = this;
    if (typeof (items[0]) === 'string' || typeof (items[0]) === 'number' || typeof (items[0]) === 'boolean') {
        for (let i = 0; i < items.length; i++) {
            let val: any = items[i];
            items[i] = {};
            items[i][objName] = val;
        }
        return items;
    } else {
        return this;
    }
};
