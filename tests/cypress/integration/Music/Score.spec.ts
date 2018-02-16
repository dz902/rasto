import { Score, Chord, ClefSign, Context, KeyModes, Note, NoteType, StemDirection, Measure } from 'Schema/Music';

let score: Score;
let contextG44CMajor = new Context({ sign: ClefSign.G, lineNumber: 2 }, { tonic: { step: 'C' }, mode: KeyModes.Major }, {
    beatsPerMeasure: 4,
    beatUnit: NoteType.Quarter
});
let chordHalfCDEFDown = new Chord(NoteType.Half, [
    new Note({ octave: 4,  step: 'C' }, 1, null, null),
    new Note({ octave: 4,  step: 'D' }, 1, null, null),
    new Note({ octave: 4,  step: 'E' }, 1, null, null),
    new Note({ octave: 4,  step: 'F' }, 1, null, null)
], StemDirection.Down);

describe('Score', () => {
    beforeEach(() => {
        score = new Score();
    });

    context('#get measures()', () => {
        it('should return measures with context and chord', () => {
            let measure = score.addMeasure(new Measure());
            measure.addContext(contextG44CMajor);
            measure.addChord(chordHalfCDEFDown);

            expect(score.measures[0].contexts[0]).to.containSubset(contextG44CMajor);
            expect(score.measures[0].chords[0]).to.containSubset(chordHalfCDEFDown);
        });
    });
});