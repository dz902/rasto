import { Mark } from './Mark';
import { Chord } from './Chord';
import { Maybe } from '../../Utilities';

/**
 * Base class representing a musical direction that encompasses multiple
 * chords and may span across measures.
 * @abstract
 */
export abstract class Direction {}

/**
 * Class representing a tie that begin on notes on a chord and ends
 * on same notes on immediate chord.
 * @extends Direction
 */
export class Tie extends Direction {
    private tiePitchIndices: number[];

    constructor(readonly chord: Chord,
                pitchIndices?: number[]) {
        super();

        if (pitchIndices === undefined) {
            pitchIndices = Array(chord.pitches.length).map((v, i) => i);
        } else {
            let chordPitchesMissing = !this.pitchIndices!.reduce((result: boolean, i: number): boolean => {
                return result && chord.pitches[i] !== undefined;
            }, true);

            if (chordPitchesMissing) {
                throw new Error('missing pitches in tie');
            }
        }

        this.tiePitchIndices = pitchIndices;
    }

    get pitchIndices(): number[] {
        return this.tiePitchIndices;
    }
}

/**
 * Class representing a slur that starts on one chord and ends on
 * another.
 * @extends Direction
 */
export class Slur extends Direction {
    constructor(readonly startingChord: Chord,
                readonly endingChord: Chord) {
        super();
    }
}

/**
 * Class representing a dynamics direction that starts on one chord and
 * has a long-lasting effect.
 */
export class Dynamics extends Direction {
    constructor(readonly startingMark: Mark,
                readonly dynamicsType: DynamicsTypes) {
        super();
    }
}

export enum DynamicsTypes {
    PPP, PP, P, MP, MF, F, FF, FFF, SFZ
}