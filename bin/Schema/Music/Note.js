import { MusicalElement, ensure } from '../Music.js';
export class Note extends MusicalElement {
    constructor(id, pitchOctave, pitchStep, duration, type) {
        super(id);
        this.id = id;
        this.duration = duration;
        this.beams = [];
        this.pitchOctave = ensurePitchOctave(Number(pitchOctave));
        this.pitchStep = ensurePitchStep(pitchStep);
        this.type = ensureNoteType(type);
    }
}
function ensurePitchStep(pitchStep) {
    if (isPitchStep(pitchStep)) {
        return pitchStep;
    }
    else {
        throw new Error(`pitch step ${pitchStep} is not valid pitch step`);
    }
}
function isPitchStep(p) {
    return p !== '' && 'ABCDEFG'.indexOf(p) !== -1;
}
function ensurePitchOctave(pitchOctave) {
    if (isPitchOctave(pitchOctave)) {
        return pitchOctave;
    }
    else {
        throw new Error(`pitch step ${pitchOctave} is not valid pitch step`);
    }
}
function isPitchOctave(p) {
    return p >= 0 && p <= 9;
}
function ensureNoteType(type) {
    return ensure(type, `note type ${type} is not valid`, (t) => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}
//# sourceMappingURL=Note.js.map