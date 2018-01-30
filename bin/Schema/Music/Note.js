import { NoteRest, ensure, ensureNumber } from '../Music.js';
export class Note extends NoteRest {
    constructor(type, pitchOctave, pitchStep, duration, isChordNote) {
        super(type);
        this.beams = [];
        this.pitchOctave = ensurePitchOctave(Number(pitchOctave));
        this.pitchStep = ensurePitchStep(pitchStep);
        this.duration = ensureNumber(duration);
        this.isChordNote = isChordNote;
    }
    addBeam(beam) {
        this.beams.push(beam);
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