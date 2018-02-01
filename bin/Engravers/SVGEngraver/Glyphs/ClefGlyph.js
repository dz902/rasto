import { Glyph, CharGlyph } from './index.js';
export class ClefGlyph extends CharGlyph {
    constructor(clefType, line) {
        super(Glyph.getGlyphName('clef', clefType), `clef clef-${clefType}`);
    }
}
//# sourceMappingURL=ClefGlyph.js.map