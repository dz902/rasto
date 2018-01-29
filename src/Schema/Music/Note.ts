import { Beam, MusicalElement, ensure } from '../Music.js';

export class Note extends MusicalElement {
    readonly pitchOctave: PitchOctave;
    readonly pitchStep: PitchStep;
    readonly beams: Beam[] = [];
    readonly type: NoteType;

    constructor(readonly id: string,
                pitchOctave: number,
                pitchStep: string,
                readonly duration: number,
                type: string) {
        super(id);

        this.pitchOctave = ensurePitchOctave(Number(pitchOctave));
        this.pitchStep = ensurePitchStep(pitchStep);
        this.type = ensureNoteType(type);
    }
}

type PitchStep = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

function ensurePitchStep(pitchStep: string): PitchStep {
    if (isPitchStep(pitchStep)) {
        return pitchStep;
    } else {
        throw new Error(`pitch step ${pitchStep} is not valid pitch step`);
    }
}

function isPitchStep(p: string): p is PitchStep {
    return p !== '' && 'ABCDEFG'.indexOf(p) !== -1;
}

type PitchOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function ensurePitchOctave(pitchOctave: number): PitchOctave {
    if (isPitchOctave(pitchOctave)) {
        return pitchOctave;
    } else {
        throw new Error(`pitch step ${pitchOctave} is not valid pitch step`);
    }
}
function isPitchOctave(p: number): p is PitchOctave {
    return p >= 0 && p <= 9;
}

type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd';

function ensureNoteType(type: string): NoteType {
    return ensure(type, `note type ${type} is not valid`,
                 (t: string): t is NoteType => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}