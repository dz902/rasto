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

export abstract class StaffPlace {
    static octave(i: number): number {
        return i * 7 - 1;
    }

    static third(): number {
        return 3;
    }
}

export type Maybe<T> = T | null;

export function maybeThen<T,S>(value: T, thenCallback: (v: T) => S): Maybe<S> {
    if (value !== undefined && value !== null) {
        return thenCallback(value);
    } else {
        return null;
    }
}

export function maybe<T>(value: T): Maybe<T> {
    if (value !== undefined) {
        return value;
    } else {
        return null;
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

export interface SimpleMap {
    [k: string]: any;
}

// PRIVATE

function uniq(): string {
    return String(performance.now()).split('.').join('');
}