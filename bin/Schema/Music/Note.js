import { Stem, MusicalElement, ensure, ensureMarkType, ensureNumber } from './index.js';
export class Note extends MusicalElement {
    constructor(type, pitchOctave, pitchStep, duration) {
        super();
        this.beams = [];
        this.type = ensureMarkType(type);
        this.pitchOctave = ensurePitchOctave(pitchOctave);
        this.pitchStep = ensurePitchStep(pitchStep);
        this.duration = duration;
        this.stem = new Stem("up");
    }
    addBeam(beam) {
        this.beams.push(beam);
    }
    configureStem(stem) {
    }
    get staffPlace() {
        return this.pitchOctave * 7 + 'CDEFGAB'.indexOf(this.pitchStep);
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