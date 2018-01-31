import { CharGlyph, MarkGlyph } from './index.js';

class ClefGlyph extends CharGlyph {
    constructor(clefType: string, line?: number) {
        super(clefType, `clef clef-${clefType}`);
    }
}