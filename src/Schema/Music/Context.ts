import { NoteType } from './Constituent';
import { PitchStep } from './Note';
import { Intervals } from './Common';

export class Context {
    constructor(readonly clef: Clef,
                readonly meter: Meter,
                readonly key: Key) {

    }

    get bottomStaffPlace(): number {
        let staffPlace = 0;

        switch (this.clef.sign) {
            case ClefSign.F:
                staffPlace = Intervals.octave * 2 + Intervals.fifth - 1;
                break;
            case ClefSign.G:
                staffPlace = Intervals.octave * 4 + Intervals.third - 1;
                break;
        }

        return staffPlace;
    }

    get topStaffPlace(): number {
        return this.bottomStaffPlace + Intervals.ninth - 1;
    }

    get midStaffPlace(): number {
        return this.bottomStaffPlace + Intervals.fifth - 1;
    }

    merge(oldContext: Context): Context {
        return new Context(
            this.clef || oldContext.clef,
            this.meter || oldContext.meter,
            this.key || oldContext.key
        );
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