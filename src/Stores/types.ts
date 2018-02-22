export interface Store<T> {
    state: T,
    mutations: {
        [k: string]: Mutator<T>
    }
}

type Mutator<T> = (state: T, payload: any) => void;

/**
 * Item family
 */

export interface ReferableItem {
    id: number;
}

export interface StaffItem {
    staffId: number;
}

export interface PartItem {
    partId: number;
}

/**
 * Container family
 */

export interface Score {
    openingBar?: Bar;
    initialContexts: Context[];
    measures: Measure[];
    directions: Direction[];
}

export interface Measure {
    endingBar?: Bar;
    staffItems: StaffItem[];
}

/**
 * StaffItem family
 */

export interface Context extends StaffItem {
    clef: Clef;
    meter: Meter;
}

export interface ContextChange extends StaffItem {
    clef?: Clef;
    meter?: Meter;
}

export interface Bar extends StaffItem {
    type: BarType;
}

export interface Mark extends ReferableItem, StaffItem, PartItem {
    type: MarkType;
}

export interface Chord extends Mark {
    notes: Note[];
    articulations: Articulation[];
}

export interface Rest extends Mark {

}

/**
 * Direction family
 */

export interface Direction {
    chordId: number;
}

export interface Slur extends Direction {
    endingChordId: number;
}

export interface Tie extends Direction {
    pitchIndices: number[];
}

export interface Dynamics extends Direction {
    type: DynamicsType;
}

/**
 * Compound types
 */

export interface Note {
    name: NoteName;
    octaveNumber: OctaveNumber;
    accidental?: Accidental;
}

export interface Articulation {
    type: ArticulationType;
}

export interface Accidental {
    type: AccidentalType;
}

export interface Clef {
    sign: ClefSign;
    lineNumber: number;
}

export interface Meter {
    beatsPerMeasure: number;
    beatUnit: MarkType;
}

/**
 * Atomic types
 */

export enum MarkType {
    Whole = 'whole'
}

export type NoteName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type OctaveNumber = number;

export enum ClefSign {
    G = 'g',
    F = 'f',
    C = 'c'
}

export enum BarType {
    Regular = 'regular'
}

export enum DynamicsType {
    FF = 'ff'
}

export enum ArticulationType {
    Accent = 'accent'
}

export enum AccidentalType {
    Sharp = 'sharp'
}

/**
 * Utilities
 */

export type Nullable<T> = T | null;
