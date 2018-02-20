import {
    Articulation, ArticulationType,
    Chord, ClefSign, Context, Dynamics, DynamicsTypes, KeyModes, MeterSymbol, Pitch, NoteType, PitchAlter,
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
                         [new Pitch('A', 3)],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]))
     .addChord(new Chord(NoteType.Quarter,
                         [new Pitch('G', 3)],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]))
     .addChord(new Chord(NoteType.Quarter,
                         [new Pitch('A', 2), new Pitch('A', 1)],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]), 1)
     .addChord(new Chord(NoteType.Quarter,
                         [new Pitch('G', 2), new Pitch('G',1)],
                         32,
                         StemDirection.Up,
                         [new Articulation(ArticulationType.Accent)]), 1);


//score.addDirection(new Dynamics(DynamicsTypes.FF, c1));

describe('Prelude in C Minor', () => {
    it('should ', () => {
        console.log(score);
    });
});