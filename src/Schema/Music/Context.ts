import { NoteType } from './Constituent';
import { PitchStep } from './Note';

export class Context {
    constructor(readonly clef: Clef,
                readonly meter: Meter,
                readonly key: Key) {

    }
}

type Clef = {
    sign: ClefSign;
    lineNumber: StaffLineNumber
};

enum ClefSign {
    G = 'G',
    F = 'F',
    C = 'C'
}

type StaffLineNumber = 1 | 2 | 3 | 4 | 5;

type Meter = {
    beatsPerMeasure: number,
    beatUnit: NoteType
};

type Key = {
    tonic: Pitch,
    mode: KeyModes
};

enum KeyModes {
    Major,
    Minor
}

type Pitch = {
    step: PitchStep,
    alter: PitchAlter
};

enum PitchAlter {
    Sharp = 'sharp',
    Flat = 'flat'
}