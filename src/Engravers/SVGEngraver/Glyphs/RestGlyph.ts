import { Glyph } from '../Glyphs.js';
import { Rest } from '../../../Schema/Music.js';

export class RestGlyph extends Glyph {
    constructor(private rest: Rest) {
        super('rest', rest.id);

        this.draw();
    }


}