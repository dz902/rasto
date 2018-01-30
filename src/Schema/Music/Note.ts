import { Beam, NoteRest, NumericValue, ensure, ensureNumber } from '../Music.js';

export class Note extends NoteRest {
    readonly pitchOctave: PitchOctave;
    readonly pitchStep: PitchStep;
    readonly duration: number;
    readonly beams: Beam[] = [];
    readonly isChordNote: boolean;

    constructor(type: string,
                pitchOctave: NumericValue,
                pitchStep: string,
                duration: NumericValue,
                isChordNote: boolean) {
        super(type);

        this.pitchOctave = ensurePitchOctave(Number(pitchOctave));
        this.pitchStep = ensurePitchStep(pitchStep);
        this.duration = ensureNumber(duration);
        this.isChordNote = isChordNote;
    }

    addBeam(beam: Beam) {
        this.beams.push(beam);
    }
}

export type Chord = NoteRest[];

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
