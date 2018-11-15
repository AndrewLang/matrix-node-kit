

interface String {
    ToLower: () => string;
    ToUpper: () => string;
    Trim: () => string;
    Normalize: () => string;
    StartsWith: (part: string) => boolean;
    EndsWith: (part: string) => boolean;
    CapFirst: () => string;
    CapWords: () => string;
    TruncateWords: (number: number) => string;
    Contains: (value: string) => boolean;
    Slugify: (lower?: boolean) => string;
    StripHtml: () => string;
    EscapeHtml: () => string;
    CountWord: () => number;
    HtmlToText: () => string;
    ValidateEmail: () => boolean;
    IndexOf: (value: string) => number;
    LastIndexOf: (value: string) => number;
    SubString: (start: number, length: number) => string;
    Encrypt: () => string;
    Decrypt: () => string;
    EncodeBase64: () => string;
    DecodeBase64: () => string;
    ParseJson: () => any;
    ToJson: (value: any) => string;
    ToFileSize: (size: number, decimals?: number) => string;
}
interface StringConstructor {
    IsNullOrEmpty: (value: any) => boolean;
    IsValid: (value: any) => boolean;
    Empty: () => string;
}

String.prototype.ToLower = function (): string {
    return this.toLowerCase();
};
String.prototype.ToUpper = function (): string {
    return this.toUpperCase();
};
String.prototype.Trim = function (): string {
    return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.Normalize = function (): string {
    return this.replace(/^\s*|\s(?=\s)|\s*$/g, '');
};
String.prototype.StartsWith = function (part: string): boolean {
    return this.slice(0, part.length) === part;
};
String.prototype.EndsWith = function (part: string): boolean {
    return this.slice(part.length) === part;
};
String.prototype.CapFirst = function (): string {
    let value = this.toString();
    if (value.length === 1) {
        return value.toUpperCase();
    } else if (value.length > 0) {
        let regex: RegExp = /^(\(|\[|'|')/;
        if (regex.test(value)) {
            return value.substring(0, 2).toUpperCase() + value.substring(2);
        } else {
            return value.substring(0, 1).toUpperCase() + value.substring(1);
        }
    }
    return '';
};
String.prototype.CapWords = function (): string {
    let regexp: RegExp = /\s/;
    let words = this.split(regexp);
    if (words.length === 1) {
        return words[0].CapFirst();
    } else if (words.length > 1) {
        let result = '';
        for (let i = 0; i < words.length; i++) {
            if (words[i].CapFirst() !== null) {
                result += words[i].CapFirst() + ' ';
            }
        }
        result.trim();
        return result;
    }
    return '';
};
String.prototype.TruncateWords = function (num: number): string {
    let words: Array<string> = this.split(/\s+/);
    if (words.length > num) {
        return words.slice(0, num).join(' ');
    }
    return words.join(' ');
};
String.prototype.StripHtml = function (): string {
    let content: string = this.replace(/<[\/]?([^> ]+)[^>]*>/g, '');
    content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/ig, '');
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '');
    content = content.replace(/<!--[\s\S]*?-->/g, '');
    content = content.replace('&nbsp;', ' ');
    content = content.replace('&amp;', '&');
    return content;
};
String.prototype.EscapeHtml = function (): string {
    let content: string = this.replace(/'/g, '&quot;');
    content.replace(/&(?!\w+;)/g, '&amp;');
    content.replace(/>/g, '&gt;');
    content.replace(/</g, '&lt;');
    return content;
};
String.prototype.Contains = function (val: string): boolean {
    if (this.indexOf(val) !== -1) {
        return true;
    }
    return false;
};
String.prototype.Slugify = function (lower: boolean = true): string {
    let value = this.toString();
    if (!lower) {
        return value.toLowerCase().normalize().replace(/[^a-z0-9]/gi, '-');
    }
    return value.normalize().replace(/[^a-z0-9]/gi, '-');
};
String.prototype.HtmlToText = function (): string {
    const output = this.replace(/<[^>]*>?/g, '');
    return output;
};
String.prototype.CountWord = function (): number {
    let content = this;
    if (!content)
        return 0;
    let words = '', symbols = '';
    content.replace(/([\w\s]*)([^\w;,.''{}\[\]+_)(*&\^%$#@!~\/?]*)/g, (a: any, b: any, c: any): string => {
        words += b;
        symbols += c;

        return a;
    });

    let count = words.trim().split(' ').length;
    if (symbols)
        count += symbols.replace(' ', '').split('').length;

    return count;
};
String.prototype.ValidateEmail = function (): boolean {
    let value = this.toString();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
};
String.prototype.IndexOf = function (value: string): number {
    return this.indexOf(value);
};
String.prototype.LastIndexOf = function (value: string): number {
    return this.lastIndexOf(value);
};
String.prototype.SubString = function (start: number, length: number): string {
    return this.substring(start, length);
};

String.prototype.EncodeBase64 = function (): string {
    let value = this.toString();
    return window.btoa(value);
};
String.prototype.DecodeBase64 = function (): string {
    let value = this.toString();
    return window.atob(value);
};
String.prototype.ParseJson = function (): any {
    let value = this.toString();
    return JSON.parse(value);
};
String.prototype.ToJson = function (value: any): string {
    return JSON.stringify(value);
};
String.prototype.ToFileSize = function (size: number, decimals?: number): string {
    if (size === 0) {
        return '0 Bytes';
    }

    let k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(size) / Math.log(k));

    return `${parseFloat((size / Math.pow(k, i)).toFixed(dm))}  ${sizes[i]}`;
};

String.IsNullOrEmpty = function (value: any): boolean {
    if (value === undefined || value === null || value.trim() === '') {
        return true;
    }
    return false;
};
String.IsValid = function (value: any): boolean {
    return !String.IsNullOrEmpty(value);
};
String.Empty = function (): string {
    return '';
};


