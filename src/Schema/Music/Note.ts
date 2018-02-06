import { Accidental, Maybe, Stem, Beam, MusicalElement, NumericValue, MarkType, ensure, ensureMarkType, ensureNumber } from './index.js';

export class Note extends MusicalElement {
    readonly type: MarkType;
    readonly pitchOctave: PitchOctave;
    readonly pitchStep: PitchStep;
    readonly pitchAlter: Maybe<number> = null;
    readonly duration: number;
    readonly beams: Beam[] = [];
    readonly stem: Stem;

    private noteAccidental: Maybe<Accidental> = null;

    constructor(type: string,
                pitchOctave: number,
                pitchStep: string,
                pitchAlter: Maybe<number>,
                duration: number) {
        super();

        this.type = ensureMarkType(type);
        this.pitchOctave = ensurePitchOctave(pitchOctave);
        this.pitchStep = ensurePitchStep(pitchStep);
        this.pitchAlter = pitchAlter;
        this.duration = duration;

        this.stem = new Stem("up");
    }

    get accidental(): Maybe<Accidental> {
        return this.noteAccidental;
    }

    get staffPlace(): number {
        // absoluteStaffPlace

        return this.pitchOctave*7 + 'CDEFGAB'.indexOf(this.pitchStep);
    }

    addBeam(beam: Beam) {
        this.beams.push(beam);
    }

    addAccidental(accidental: Accidental) {
        this.noteAccidental = accidental;
    }

    configureStem(stem: Stem) {
    }

    getIntervalTo(note: Note): number {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}

type PitchStep = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

function ensurePitchStep(pitchStep: string): PitchStep {
    return ensure(pitchStep, `pitch step ${pitchStep} is not valid pitch step`,
                  (p: string): p is PitchStep => (p !== '' && 'ABCDEFG'.indexOf(p) !== -1))

}

type PitchOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function ensurePitchOctave(pitchOctave: NumericValue): PitchOctave {
    let p = ensureNumber(pitchOctave);
    return ensure(p,`pitch step ${pitchOctave} is not valid pitch step`,
                  (p: number): p is PitchOctave => (p >= 0 && p <= 9))
}