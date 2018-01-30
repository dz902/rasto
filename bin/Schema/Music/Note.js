import { Stem, NoteRest, ensure, ensureNumber } from '../Music.js';
export class Note extends NoteRest {
    constructor(type, pitchOctave, pitchStep, duration, isChordNote) {
        super(type);
        this.beams = [];
        this.pitchOctave = ensurePitchOctave(Number(pitchOctave));
        this.pitchStep = ensurePitchStep(pitchStep);
        this.duration = ensureNumber(duration);
        this.isChordNote = isChordNote;
        this.stem = new Stem("up");
    }
    addBeam(beam) {
        this.beams.push(beam);
    }
    configureStem(stem) {
    }
    get staffPlace() {
        return this.pitchOctave * 8 + 'CDEFGAB'.indexOf(this.pitchStep);
    }
    getIntervalTo(note) {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}
export function ensureNote(noteRest) {
    return ensure(noteRest, `item is not a note`, (noteRest) => noteRest instanceof Note);
}
function ensurePitchStep(pitchStep) {
    return ensure(pitchStep, `pitch step ${pitchStep} is not valid pitch step`, (p) => (p !== '' && 'ABCDEFG'.indexOf(p) !== -1));
}
function ensurePitchOctave(pitchOctave) {
    let p = ensureNumber(pitchOctave);
    return ensure(p, `pitch step ${pitchOctave} is not valid pitch step`, (p) => (p >= 0 && p <= 9));
}
//# sourceMappingURL=Note.js.map