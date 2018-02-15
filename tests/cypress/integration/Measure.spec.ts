import { Chord, ClefSign, Context, KeyModes, Measure, Note, NoteType, StemDirection } from 'Schema/Music';

let measure: Measure;
let contextG44CMajor = new Context(
    { sign: ClefSign.G, lineNumber: 2 },
    { beatsPerMeasure: 4, beatUnit: NoteType.Quarter },
    { tonic: { step: 'C' }, mode: KeyModes.Major });
let chordHalfCDEFDown = new Chord(NoteType.Half, [
    new Note(4, 'C', null, 1),
    new Note(4, 'D', null, 1),
    new Note(4, 'E', null, 1),
    new Note(4, 'F', null, 1)
], StemDirection.Down);

describe('Measure', () => {
    beforeEach(() => {
        measure = new Measure();
    });

    context('#addContext()', () => {
        it('should add context to measure', () => {
            measure.addContext(contextG44CMajor);

            expect(measure.items[0]).to.be.instanceof(Context);

            expect(measure.contexts[0].clef).to.equal(contextG44CMajor.clef);
            expect(measure.contexts[0].meter).to.equal(contextG44CMajor.meter);
            expect(measure.contexts[0].key).to.equal(contextG44CMajor.key);
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
    });
});