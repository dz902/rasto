import {
    Articulation, ArticulationType,
    Chord, ClefSign, Context, Dynamics, DynamicsTypes, KeyModes, Measure, MeterSymbol, Note, NoteType, PitchAlter,
    Score,
    StemDirection
} from 'Schema/Music';

let score: Score = new Score();

score.addMeasure()
     .addContext(
         new Context(
             { sign: ClefSign.G, lineNumber: 2 },
             { tonic: { step: 'C', alter: PitchAlter.Sharp }, mode: KeyModes.Minor },
             { beatUnit: 4, beatsPerMeasure: 4 }
         ),
         0)
     .addContext(
         new Context(
             { sign: ClefSign.F, lineNumber: 4 },
             { tonic: { step: 'C', alter: PitchAlter.Sharp }, mode: KeyModes.Minor },
             { beatUnit: 4, beatsPerMeasure: 4 }
         ),
         1)
     .addChord(new Chord(NoteType.Quarter,
                         [new Note({step: 'A', octave: 3})],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]))
     .addChord(new Chord(NoteType.Quarter,
                         [new Note({step: 'G', octave: 3})],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]))
     .addChord(new Chord(NoteType.Quarter,
                         [new Note({step: 'A', octave: 2}), new Note({step: 'A', octave: 1})],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]), 1)
     .addChord(new Chord(NoteType.Quarter,
                         [new Note({step: 'G', octave: 2}), new Note({step: 'G', octave: 1})],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]), 1);


//score.addDirection(new Dynamics(DynamicsTypes.FF, c1));

describe('Prelude in C Minor', () => {
    it('should ', () => {
        console.log(score);
    });
});