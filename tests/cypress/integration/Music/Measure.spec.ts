import { Chord, ClefSign, Context, KeyModes, Measure, Note, NoteType, StemDirection } from 'Schema/Music';

let measure: Measure;
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

describe('Measure', () => {
    beforeEach(() => {
        measure = new Measure();
    });

    context('#addContext()', () => {
        it('should add context to measure', () => {
            measure.addContext(contextG44CMajor);

            expect(measure.items[0]).to.be.instanceof(Context);
            expect(measure.contexts[0]).to.containSubset(contextG44CMajor);
        });
    });

    context('#addChord()', () => {
        beforeEach(() => {
            measure.addContext(contextG44CMajor);
            measure.addChord(chordHalfCDEFDown);
        });

        it('should add chord to measure', () => {
            expect(measure.chords[0].notes).to.deep.equal(chordHalfCDEFDown.notes);
        });

        it('should set context for added chord', () => {
            expect(measure.chords[0].context).to.containSubset(contextG44CMajor);
        });
    });
});