import { Score, Chord, ClefSign, Context, KeyModes, Note, NoteType, StemDirection } from 'Schema/Music';

let score: Score;
let contextG44CMajor = new Context(
    { sign: ClefSign.G, lineNumber: 2 },
    { beatsPerMeasure: 4, beatUnit: NoteType.Quarter },
    { tonic: { step: 'C' }, mode: KeyModes.Major });
let chordHalfCDEFDown = new Chord(NoteType.Half, [
    new Note({ octave: 4,  step: 'C' }, 1),
    new Note({ octave: 4,  step: 'D' }, 1),
    new Note({ octave: 4,  step: 'E' }, 1),
    new Note({ octave: 4,  step: 'F' }, 1)
], StemDirection.Down);

describe('Score', () => {
    beforeEach(() => {
        score = new Score();
    });

    context('#get measures()', () => {
        it('should return measures with context and chord', () => {
            score.addContext(contextG44CMajor);
            score.addChord(chordHalfCDEFDown);

            expect(score.measures.length).to.equal(1);
            expect(score.measures[0].contexts[0]).to.containSubset(contextG44CMajor);
            expect(score.measures[0].chords[0]).to.containSubset(chordHalfCDEFDown);
        });
    });

    context('#get currentMeasure()', () => {
        it('should return last measure', () => {
            score.addContext(contextG44CMajor);
            score.addChord(chordHalfCDEFDown);

            expect(score.measures.length).to.equal(1);
        });
    });
});