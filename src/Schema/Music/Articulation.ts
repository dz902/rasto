import { Maybe } from 'Utilities';
import { Chord } from './Chord';
import { Mark } from './Mark';

export class Articulation {
    constructor(readonly type: ArticulationType) {
    }
}

export enum ArticulationType {
    Accent, Staccato, Staccatissimo, Tenuto, Fermata
}

export class Direction {
    constructor(private directionStartingMark: Mark,
                private directionEndingMark: Maybe<Mark>) {
    }

    get startingMark(): Mark {
        return this.directionStartingMark;
    }

    get endingMark(): Maybe<Mark> {
        return this.directionEndingMark;
    }
}

export class Slur extends Direction {
    constructor(startingChord: Chord,
                endingChord: Chord) {
        super(startingChord, endingChord);
    }

    get startingChord(): Chord {
        return this.startingMark as Chord;
    }

    get endingChord(): Chord {
        return (this.endingMark !== null ? this.endingMark : this.startingMark) as Chord;
    }
}

export class Dynamics extends Direction {
    constructor(readonly dynamicsType: DynamicsTypes,
                readonly mark: Mark) {
        super(mark, null);
    }
}

export enum DynamicsTypes {
    PPP, PP, P, MP, MF, F, FF, FFF, SFZ
}