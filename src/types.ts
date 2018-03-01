export interface Bindings {
    [k: string]: any
}

export type BBox = Bindings & {
    width: number;
    height: number;
    x: number;
    y: number;
};

export interface Anchored extends Bindings {
    anchor: Positioned;
}

export interface Positioned extends Bindings {
    x: number;
    y: number;
}

export interface Dimensioned extends Bindings {
    width: number;
    height: number;
}

export enum GlyphKind {
    NoteHead = 'note-head',
    Flag = 'flag'
}

export enum FlagType {
    N8th = '8th',
    N16th = '16th',
    Internal = 'internal'
}

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
    leftBar?: Bar;
    initialContexts: Context[];
    measures: Measure[];
    directions: Direction[];
    layout: ScoreLayout;
}

export interface Measure {
    rightBar?: Bar;
    items: MeasureItem[];
}

/**
 * StaffItem family
 */

export type MeasureItem = Chord | Rest | ContextChange | Bar;

export type ContextChange = Partial<Context> & StaffItem & { kind: 'contextChange' };

export interface Context extends StaffItem {
    clef: Clef;
    meter: Meter;
}

export interface Bar extends StaffItem {
    kind: 'bar';
    type: BarType;
}

export interface Mark extends ReferableItem, PartItem {
    type: MarkType;
}

export interface Chord extends Mark, StaffItem {
    kind: 'chord';
    notes: Note[];
    articulations?: Articulation[];
    stemDirection: StemDirection;
}

export interface Rest extends Mark, StaffItem {
    kind: 'rest';
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

export interface ScoreLayout {
    scoreWidth: number;
    [k: string]: any;
}

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
    Whole = 'whole',
    Half = 'half',
    Quarter = 'quarter',
    N8th = '8th',
    N16th = '16th',
    N32th = '32th',
    N64th = '64th',
    N128th = '128th'
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

export enum StemDirection {
    Up = 'up',
    Down = 'down'
}


/**
 * Utilities
 */

export type Nullable<T> = T | null;
export type Partial<T> = {
    [P in keyof T]?: T[P];
}

