import { Chord, ClefSign, Context, KeyModes, Measure, Note, NoteType, StemDirection } from 'Schema/Music';

describe('Measure', () => {
    context('#addContext()', () => {
        it('should add context to measure', () => {
            let context = new Context({ sign: ClefSign.G, lineNumber: 2 },
                                      { beatsPerMeasure: 4, beatUnit: NoteType.Quarter },
                                      { tonic: { step: 'C' }, mode: KeyModes.Major });
            let chord = new Chord(NoteType.Half, [
                new Note(4, 'C', null, 1),
                new Note(4, 'D', null, 1),
                new Note(4, 'E', null, 1),
                new Note(4, 'F', null, 1)
            ], StemDirection.Down);

            let measure = new Measure();

            measure.addContext(context);
            measure.addChord(chord);

            console.log(measure);
        });
    });
});