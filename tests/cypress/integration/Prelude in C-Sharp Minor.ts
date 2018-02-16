import {
    Articulation, ArticulationType,
    Chord, ClefSign, Context, KeyModes, Measure, MeterSymbol, Note, NoteType, PitchAlter, Score,
    StemDirection
} from 'Schema/Music';

let score: Score = new Score();

let contextGCSharpMinor44 = new Context(
    { sign: ClefSign.G, lineNumber: 2 },
    { tonic: { step: 'C', alter: PitchAlter.Sharp }, mode: KeyModes.Minor },
    { beatsPerMeasure: 4, beatUnit: NoteType.Quarter, symbol: MeterSymbol.CommonTime }
);
let contextFCSharpMinor44 = new Context(
    { sign: ClefSign.F, lineNumber: 4 },
    { tonic: { step: 'C', alter: PitchAlter.Sharp }, mode: KeyModes.Minor },
    { beatsPerMeasure: 4, beatUnit: NoteType.Quarter, symbol: MeterSymbol.CommonTime }
);

let m0 = score.addMeasure(new Measure());
m0.addContext(contextGCSharpMinor44, 0);
m0.addChord(
    new Chord(
        NoteType.Quarter,
        [
            new Note({octave: 3, step: 'A'}, 32, null, [new Articulation(ArticulationType.Accent)])
        ], StemDirection.Up),
    0
);
m0.addContext(contextFCSharpMinor44, 1);



let chordHalfCDEFDown = new Chord(NoteType.Half, [
    new Note({ octave: 4, step: 'C' }, 1, null, null),
    new Note({ octave: 4, step: 'D' }, 1, null, null),
    new Note({ octave: 4, step: 'E' }, 1, null, null),
    new Note({ octave: 4, step: 'F' }, 1, null, null)
], StemDirection.Down);

describe('Prelude in C Minor', () => {
    it('should ', () => {
        
    });
});