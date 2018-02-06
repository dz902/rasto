import { Stem, MusicalElement, ensure, ensureMarkType, ensureNumber } from './index.js';
export class Note extends MusicalElement {
    constructor(type, pitchOctave, pitchStep, pitchAlter, duration) {
        super();
        this.pitchAlter = null;
        this.beams = [];
        this.noteAccidental = null;
        this.type = ensureMarkType(type);
        this.pitchOctave = ensurePitchOctave(pitchOctave);
        this.pitchStep = ensurePitchStep(pitchStep);
        this.pitchAlter = pitchAlter;
        this.duration = duration;
        this.stem = new Stem("up");
    }
    get accidental() {
        return this.noteAccidental;
    }
    get staffPlace() {
        // absoluteStaffPlace
        return this.pitchOctave * 7 + 'CDEFGAB'.indexOf(this.pitchStep);
    }
    addBeam(beam) {
        this.beams.push(beam);
    }
    addAccidental(accidental) {
        this.noteAccidental = accidental;
    }
    configureStem(stem) {
    }
    getIntervalTo(note) {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}
function ensurePitchStep(pitchStep) {
    return ensure(pitchStep, `pitch step ${pitchStep} is not valid pitch step`, (p) => (p !== '' && 'ABCDEFG'.indexOf(p) !== -1));
}
function ensurePitchOctave(pitchOctave) {
    let p = ensureNumber(pitchOctave);
    return ensure(p, `pitch step ${pitchOctave} is not valid pitch step`, (p) => (p >= 0 && p <= 9));
}
//# sourceMappingURL=Note.js.map