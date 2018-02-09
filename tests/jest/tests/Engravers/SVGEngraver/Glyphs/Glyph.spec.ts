import { Glyph } from 'Engravers/SVGEngraver/Glyphs';

describe('Glyph', function() {
    describe('#constructor', function() {
        let glyph = new Glyph('glyph', '123');

        it('should create an SVGElement', () => {
            expect(glyph.element).toBeInstanceOf(SVGSVGElement);
        });

        it('should have type and ID ', () => {
            //expect(glyph.type).toBe('type');
        });
    });
});