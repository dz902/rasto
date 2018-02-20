import { StaffPlaces, StemDirection, Measure, Context, ClefSign, KeyModes, Note, NoteType, Chord } from 'SchemasMusic';

let measure: Measure;

describe('Measure', () => {
    describe('#constructor()', () => {
        beforeEach(() => {
            measure = new Measure();

            measure.addContext(
                new Context(
                    { sign: ClefSign.G, lineNumber: 2 },
                    { beatsPerMeasure: 4, beatUnit: NoteType.Quarter },
                    { tonic: { step: 'C' }, mode: KeyModes.Major },
                    0
                )
            );

            let notes = [
                new Note(4, 'F', null, 1, null),
                new Note(4, 'G', null, 1, null),
                new Note(4, 'A', null, 1, null),
                new Note(5, 'C', null, 1, null),
                new Note(5, 'D', null, 1, null),
                new Note(5, 'G', null, 1, null),
                new Note(5, 'A', null, 1, null)
            ];

            let chord = new Chord(NoteType.Whole, notes);

            measure.addChord(chord);
        });

        it('should have one chord', () => {
            expect(measure.chords.length).toBe(1);
        });

        it('should set direction as down', () => {
            expect(measure.chords[0].stemDirection).toBe(StemDirection.Down);
        });

        it('should set correct note displacement for down direction', () => {
            expect(measure.chords[0].pitches[0].displacement).toBe(false);
            expect(measure.chords[0].pitches[1].displacement).toBe(true);
            expect(measure.chords[0].pitches[2].displacement).toBe(false);
            expect(measure.chords[0].pitches[3].displacement).toBe(true);
            expect(measure.chords[0].pitches[4].displacement).toBe(false);
        });

        it('should set correct note displacement for up direction', () => {
            measure.chords[0].changeStemDirection(StemDirection.Up);

            expect(measure.chords[0].pitches[0].displacement).toBe(false);
            expect(measure.chords[0].pitches[1].displacement).toBe(true);
            expect(measure.chords[0].pitches[2].displacement).toBe(false);
            expect(measure.chords[0].pitches[3].displacement).toBe(false);
            expect(measure.chords[0].pitches[4].displacement).toBe(true);
        });

        it('should need ledger line for higher notes', () => {
            expect(measure.chords[0].ledgerLines.highest).toBe(StaffPlaces.staffSpan + StaffPlaces.third);
            expect(measure.chords[0].ledgerLines.lowest).toBe(null);
        });
    });
})