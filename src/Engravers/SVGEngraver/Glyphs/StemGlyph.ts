import { Glyph, RectGlyph } from './index.js';

export class StemGlyph extends RectGlyph {
    constructor() {
        super('stem');

        this.width = Glyph.meta.defaults.stemThickness;
    }
}