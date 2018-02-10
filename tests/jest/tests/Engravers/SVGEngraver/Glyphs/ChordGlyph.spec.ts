import { ChordGlyph } from 'Engravers/SVGEngraver/Glyphs';
import { StemDirection, Chord, Note, MeasureContext } from 'Schema/Music';

let chord: Chord;


describe('ChordGlyph', () => {
    describe('#constructor()', () => {
        beforeEach(() => {
            let context = new MeasureContext(4, 4, 4, 'G', 2);
            let notes = [
                new Note('whole', 4, 'F', null, 1),
                new Note('whole', 4, 'G', null, 1),
                new Note('whole', 4, 'A', null, 1),
                new Note('whole', 5, 'C', null, 1),
                new Note('whole', 5, 'D', null, 1)
            ];

            chord = new Chord(notes, 'whole', context);
        });

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

        it('should set correct note displacement for down direction', () => {
            chord.forceDirection(StemDirection.Down);

            expect(chord.notes[0].needsDisplacement).toBe(false);
            expect(chord.notes[1].needsDisplacement).toBe(true);
            expect(chord.notes[2].needsDisplacement).toBe(false);
            expect(chord.notes[3].needsDisplacement).toBe(true);
            expect(chord.notes[4].needsDisplacement).toBe(false);
        });

        it('should not need stems for whole notes', () => {
            expect(chord.needsStem).toBe(false);
        });
    });
});