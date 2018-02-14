import { Maybe } from 'Utilities/Maybe';

export enum NoteType {
    Whole = 1,
    Half = 2,
    Quarter = 4,
    Eighth = 8,
    N16th = 16,
    N32nd = 32,
    N64th = 64,
    N128th = 128
}

export function ensureNoteType(noteType: number): NoteType {
    let markTypeList: number[] = [
        NoteType.Whole,
        NoteType.Half,
        NoteType.Quarter,
        NoteType.Eighth,
        NoteType.N16th,
        NoteType.N32nd,
        NoteType.N64th,
        NoteType.N128th
    ];

    return ensure(noteType, `mark type ${noteType} is not valid`,
                  (t: number): t is NoteType => markTypeList.indexOf(t) !== -1);
}

export type PitchStep = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export function ensurePitchStep(pitchStep: string): PitchStep {
    return ensure(pitchStep, `pitch step ${pitchStep} is not valid pitch step`,
                  (p: string): p is PitchStep => (p !== '' && 'ABCDEFG'.indexOf(p) !== -1))

}

export type PitchOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function ensurePitchOctave(pitchOctave: NumericValue): PitchOctave {
    let p = ensureNumber(pitchOctave);
    return ensure(p,`pitch step ${pitchOctave} is not valid pitch octave`,
                  (p: number): p is PitchOctave => (p >= 0 && p <= 9))
}

export enum FlagType {
    Half = 2,
    Quarter = 4,
    Eighth = 8,
    N16th = 16,
    N32nd = 32,
    N64th = 64,
    N128th = 128
}

export type LedgerLines = {
    highest: Maybe<number>,
    lowest: Maybe<number>
};

export enum StaffPlaces {
    unison = 0,
    second, third, fourth, fifth, sixth, seventh, octave, ninth,
    staffSpan = 8
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


export interface StaffItem {
    readonly staffNumber: number;
}

export enum StemDirection {
    Up = 'up',
    Down = 'down'
}

export class ErrorMeasureOverflow extends Error {}
export class ErrorMeasureUnfitNoteType extends Error {}