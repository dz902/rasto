export class MusicalElement {
    readonly id: string;
    readonly data: Data = {};

    constructor(id?:string) {
        this.id = id ? id : uniq();
    }

    addData(k: string, value: any) {
        this.data[k] = value;
    }
}

export function maybe<T>(value: T, thenCallback?: (value: T) => any): T | undefined {
    if (value !== undefined) {
        if (thenCallback) {
            return thenCallback(value);
        } else {
            return value;
        }
    } else {
        return undefined;
    }
}

export function ensure<U, T>(value: U, errorMessage: string, predicate: (value: U | T) => value is T): T {
    if (predicate(value)) {
        return value;
    } else {
        throw new Error(errorMessage);
    }
}

export function ensureNumber(value: any): number {
    let numericValue = Number(value);

    return ensure(numericValue,
                  `value ${value} is not a valid number`,
                  (n: any): n is number => !Number.isNaN(n))
}

export type Data = {
    [k: string]: any;
};

export type NumericValue = string | number;

export interface Attributes {
    [k: string]: any;
}

// PRIVATE

function uniq(): string {
    return String(performance.now()).split('.').join('');
}