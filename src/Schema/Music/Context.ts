import { NoteType, PitchStep, StaffPlaces, StaffItem } from 'Schema/Music';

export class Context {
    constructor(readonly clef: Clef,
                readonly meter: Meter,
                readonly key: Key) {

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

    merge(newContext: Context): Context {
        return new Context(
            newContext.clef || this.clef,
            newContext.meter || this.meter,
            newContext.key || this.key
        );
    }
}

type Clef = {
    sign: ClefSign;
    lineNumber: number
};

export enum ClefSign {
    G = 'G',
    F = 'F',
    C = 'C'
}

type Meter = {
    beatsPerMeasure: number,
    beatUnit: NoteType
};

type Key = {
    tonic: Pitch,
    mode: KeyModes
};

export enum KeyModes {
    Major = 'major',
    Minor = 'minor'
}

type Pitch = {
    step: PitchStep,
    alter?: PitchAlter
};

export enum PitchAlter {
    Sharp = 'sharp',
    Flat = 'flat'
}