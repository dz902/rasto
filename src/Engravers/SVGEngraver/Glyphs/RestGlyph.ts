import { Glyph } from '.';
import { Rest } from '../../../Schema/Music';

export class RestGlyph extends Glyph {
    constructor(private rest: Rest) {
        super('rest', rest.id);

        this.draw();
    }


}