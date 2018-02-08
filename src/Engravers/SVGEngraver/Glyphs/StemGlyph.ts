import { Glyph, RectGlyph } from '.';

export class StemGlyph extends RectGlyph {
    constructor() {
        super('stem');

        this.width = Glyph.meta.defaults.stemThickness;
    }
}