import { Maybe } from '../../Utilities/Maybe';


export type LedgerLines = {
    highest: Maybe<number>,
    lowest: Maybe<number>
};

export class MusicalElement {
    readonly id: string;
    readonly data: SimpleMap = {};

    constructor(id?:string) {
        this.id = id ? id : uniq();
    }
}

export enum Intervals {
    unison = 1,
    second, third, fourth, fifth, sixth, seventh, octave, ninth
}

export function maybeThen<T,S>(value: T, thenCallback: (v: T) => S): Maybe<S> {
    if (value !== null) {
        return thenCallback(value);
    } else {
        return null;
    }
}

export function maybe<T>(value: T): Maybe<T> {
    if (value !== null) {
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

export function diff<T extends SimpleMap, K extends keyof T>(keys: K[], a: T, b: T): Maybe<SimpleMap> {
    let isDiff = false;
    let result: SimpleMap = {};

    for (let k of keys) {
        if (b[k] !== a[k]) {
            isDiff = true;
            result[k] = b[k];
        } else {
            result[k] = a[k]; // still keep original key and value
        }
    }

    return isDiff ? result : null;
}

export function ensureNumber(value: any): number {
    let numericValue = Number(value);

    return ensure(numericValue,
                  `value ${value} is not a valid number`,
                  (n: any): n is number => !Number.isNaN(n))
}

export type NumericValue = string | number;

export interface SimpleMap {
    [k: string]: any;
}

// HELPERS, to be moved later

export function toNameCase(s: string): string {
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
}

export function toCamelCase(ss: string, i: number): string {
    return i === 0 ? ss.toLowerCase() : toNameCase(ss);
}

// PRIVATE

function uniq(): string {
    let randomNumber = window.performance ? window.performance.now() : Math.random();
    return String(randomNumber).split('.').join('');
}
