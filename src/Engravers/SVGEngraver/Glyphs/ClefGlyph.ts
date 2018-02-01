import { Glyph, CharGlyph, MarkGlyph } from './index.js';

export class ClefGlyph extends CharGlyph {
    constructor(clefType: string, line?: number) {
        super(Glyph.getGlyphName('clef', clefType), `clef clef-${clefType}`);
    }
}