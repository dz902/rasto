import { Stem, Beam, Mark, MusicalElement, NumericValue, MarkType, ensure, ensureMarkType, ensureNumber } from './index.js';

export class Note extends MusicalElement {
    readonly type: MarkType;
    readonly pitchOctave: PitchOctave;
    readonly pitchStep: PitchStep;
    readonly duration: number;
    readonly beams: Beam[] = [];
    readonly stem: Stem;

    constructor(type: string,
                pitchOctave: NumericValue,
                pitchStep: string,
                duration: NumericValue) {
        super();

        this.type = ensureMarkType(type);
        this.pitchOctave = ensurePitchOctave(Number(pitchOctave));
        this.pitchStep = ensurePitchStep(pitchStep);
        this.duration = ensureNumber(duration);

        this.stem = new Stem("up");
    }

    addBeam(beam: Beam) {
        this.beams.push(beam);
    }

    configureStem(stem: Stem) {
    }

    get staffPlace(): number {
       return this.pitchOctave*8 + 'CDEFGAB'.indexOf(this.pitchStep);
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