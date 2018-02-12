import { NoteType, StemDirection, Chord, Note } from 'Schema/Music';

let chord: Chord;

describe('Chord', () => {
    describe('#constructor()', () => {
        beforeEach(() => {
            let notes = [
                new Note(4, 'F', null, 1, null),
                new Note(4, 'G', null, 1, null),
                new Note(4, 'A', null, 1, null),
                new Note(5, 'C', null, 1, null),
                new Note(5, 'D', null, 1, null),
                new Note(5, 'G', null, 1, null),
                new Note(5, 'A', null, 1, null)
            ];

            chord = new Chord(NoteType.Whole, notes);
        });

        it('should have 7 notes', () => {
            expect(chord.notes.length).toBe(7);
        });

        it('should be a whole note chord', () => {
            expect(chord.type).toBe(NoteType.Whole);
        });
    });
});