import { ChordGlyph } from 'Engravers/SVGEngraver/Glyphs';
import { Chord, Note, MeasureContext } from 'Schema/Music';

let chord: Chord;

beforeEach(() => {
    let context = new MeasureContext(4, 4, 4, 'G', 2);

    chord = new Chord([
        new Note('whole', 4, 'F', undefined, 1),
        new Note('whole', 4, 'G', undefined, 1),
        new Note('whole', 4, 'A', undefined, 1),
        new Note('whole', 5, 'C', undefined, 1),
        new Note('whole', 5, 'D', undefined, 1),
    ], 'whole', context);
});

describe('ChordGlyph', () => {
    describe('#addNote()', () => {
        it('should have five notes', () => {
            expect(chord.notes.length).toBe(5);
        });

        it('should set correct note displacement for up direction', () => {
            expect(chord.notes[0].needsDisplacement).toBe(false);
            expect(chord.notes[1].needsDisplacement).toBe(true);
            expect(chord.notes[2].needsDisplacement).toBe(false);
            expect(chord.notes[3].needsDisplacement).toBe(false);
            expect(chord.notes[4].needsDisplacement).toBe(true);
        });
    });
});