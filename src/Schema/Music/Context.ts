import { NoteType, PitchStep, StaffPlaces, StaffItem } from 'Schema/Music';

export class Context implements StaffItem {
    constructor(readonly clef: Clef,
                readonly meter: Meter,
                readonly key: Key,
                readonly staffNumber: number) {

    }

    get bottomStaffPlace(): number {
        let staffPlace = 0;

        switch (this.clef.sign) {
            case ClefSign.F:
                staffPlace = (StaffPlaces.octave) * 2 + StaffPlaces.fifth;
                break;
            case ClefSign.G:
                staffPlace = (StaffPlaces.octave) * 4 + StaffPlaces.third;
                break;
            default:
                throw new Error();
        }

        return staffPlace;
    }

    get topStaffPlace(): number {
        return this.bottomStaffPlace + StaffPlaces.ninth;
    }

    get midStaffPlace(): number {
        return this.bottomStaffPlace + StaffPlaces.fifth;
    }

    static merge(oldContext: Context, newContext: Context): Context {
        if (newContext.staffNumber !== oldContext.staffNumber) {
            throw new Error('cannot merge context with different staff numbers');
        }

        return new Context(
            newContext.clef || oldContext.clef,
            newContext.meter || oldContext.meter,
            newContext.key || oldContext.key,
            newContext.staffNumber
        );
    }
}

type Clef = {
    sign: ClefSign;
    lineNumber: StaffLineNumber
};

export enum ClefSign {
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

export enum KeyModes {
    Major,
    Minor
}

type Pitch = {
    step: PitchStep,
    alter?: PitchAlter
};

export enum PitchAlter {
    Sharp = 'sharp',
    Flat = 'flat'
}