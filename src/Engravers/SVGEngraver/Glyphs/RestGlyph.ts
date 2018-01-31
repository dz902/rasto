import { Glyph } from './index.js';
import { Rest } from '../../../Schema/Music/index.js';

export class RestGlyph extends Glyph {
    constructor(private rest: Rest) {
        super('rest', rest.id);

        this.draw();
    }


}