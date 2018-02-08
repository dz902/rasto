import { Glyph } from 'Engravers/SVGEngraver/Glyphs';
import glyphNames from '../../../../../src/Schema/SMuFL/glyphnames';

let glyph: Glyph;

beforeEach(() => {
});

describe('Glyph', function() {
    describe('#constructor', function() {
        glyph = new Glyph('glyph', '123');

        it('should create an SVGElement', () => {
            expect(glyph.element).toBeInstanceOf(SVGSVGElement);
        });

        it('should have type and ID ', () => {
            //expect(glyph.type).toBe('type');
        });
    });
});