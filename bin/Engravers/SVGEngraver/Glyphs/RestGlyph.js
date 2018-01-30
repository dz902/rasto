import { Glyph } from '../Glyphs.js';
export class RestGlyph extends Glyph {
    constructor(rest) {
        super('rest', rest.id);
        this.rest = rest;
        this.draw();
    }
}
//# sourceMappingURL=RestGlyph.js.map