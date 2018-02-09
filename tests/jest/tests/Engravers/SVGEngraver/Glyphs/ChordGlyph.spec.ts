import { ChordGlyph } from 'Engravers/SVGEngraver/Glyphs';
import { Chord, Note, MeasureAttributes } from 'Schema/Music';

describe('ChordGlyph', () => {
    describe('#constructor', () => {
        let context = {
            divisions: 4,
            timeBeats: 4,
            timeBeatType: 4,
            clefSign: 'G',
            clefLine: 2
        };

        let chord = new Chord('whole', context);

        chord.addNote(new Note('whole', 4, 'C', undefined, 1))
             .addNote(new Note('whole', 4, 'E', undefined, 1))
             .addNote(new Note('whole', 4, 'G', undefined, 1));

        let glyph = new ChordGlyph(chord);

        it('should create an SVGElement', () => {
            expect(glyph.element).toBeInstanceOf(SVGSVGElement);
        });

        it('should have type and ID ', () => {
            expect(glyph.element.getAttribute('class')).toMatch(/id\-.+/);
            expect(glyph.element.getAttribute('class')).toMatch(/chord/);
        });
    });
});