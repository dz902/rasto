export function ensurePitchStep(pitchStep) {
    if (isPitchStep(pitchStep)) {
        return pitchStep;
    }
    else {
        throw new Error(`pitch step ${pitchStep} is not valid pitch step`);
    }
}
export function isPitchStep(p) {
    return ['abcdefg'].indexOf(p) !== -1;
}
export function ensurePitchOctave(pitchOctave) {
    if (isPitchOctave(pitchOctave)) {
        return pitchOctave;
    }
    else {
        throw new Error(`pitch step ${pitchOctave} is not valid pitch step`);
    }
}
export function isPitchOctave(p) {
    return p >= 0 && p <= 9;
}
//# sourceMappingURL=Note.js.map