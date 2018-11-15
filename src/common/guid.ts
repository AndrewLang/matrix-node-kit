
export class Guid {
    static Empty = '00000000-0000-0000-0000-000000000000';
    static Validator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');
    private value: string;

    constructor(value: any) {
        if (!value)
            throw new TypeError('Invalid argument; `value` has no value.');

        this.value = Guid.Empty;

        if (value && value instanceof Guid) {
            this.value = (value as Guid).Value;
        } else if (value && Object.prototype.toString.call(value) === '[object String]' && Guid.IsGuid(value)) {
            this.value = value;
        }
    }

    get Value(): string {
        return this.value;
    }
    IsEmpty(): boolean {
        return this.value === Guid.Empty;
    }
    ToString(): string {
        return this.value;
    }
    ToJson(): string {
        return this.value;
    }

    private static Generate(count: number): string {
        let out = '';
        for (let i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    }
    static New(): Guid {
        return new Guid([Guid.Generate(2), Guid.Generate(1), Guid.Generate(1), Guid.Generate(1), Guid.Generate(3)].join('-'));
    }
    static IsGuid(value: any): boolean {
        return value && (value instanceof Guid || Guid.Validator.test(value.toString()));
    }

}