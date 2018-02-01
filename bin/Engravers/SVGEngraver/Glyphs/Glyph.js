import { SVG } from './index.js';
import * as SMuFL from '../../../Schema/SMuFL.js';
export class Glyph extends SVG {
    // INSTANCE
    constructor(type, id = 'none') {
        super('svg');
        this.type = type;
        this.id = id;
        // DRAW
        this.draw = () => {
            // has to keep strange syntax to get correct this.draw()
            // there are no other way to automatically call the right draw()
            // keeping explicit draw() calls make code more readable
            // so do not refactor
            this.addClass(`id-${this.id}`);
            this.addClass(this.type);
            Glyph.refs[this.id] = this.rawElement;
        };
        Glyph.meta = SMuFL.load('Bravura');
        this.draw();
    }
    // META OPS
    static getGlyphName(type, key) {
        let table;
        switch (type) {
            case 'clef':
                table = {
                    'G': 'gClef'
                };
                break;
            default:
                return '';
        }
        return table[key];
    }
    // GLYPH OPS
    advance(x) {
        Glyph.headPosition.x += x;
        this.move(Glyph.headPosition.x);
        return this;
    }
    shift(y) {
        Glyph.headPosition.y = 4 - y / 2; // 4 = line 1, 3 = line 2, etc.
        this.move(undefined, Glyph.headPosition.y);
    }
    // OVERRIDE WITH NEW UNITS
    move(x, y) {
        super.move(x ? x * Glyph.STAFF_SPACE : undefined, y ? y * Glyph.STAFF_SPACE : undefined);
        return this;
    }
    translate(x, y) {
        super.translate(x ? x * Glyph.STAFF_SPACE : undefined, y ? y * Glyph.STAFF_SPACE : undefined);
        return this;
    }
}
// STATIC
Glyph.EM = 32;
Glyph.STAFF_SPACE = Glyph.EM * 0.25;
Glyph.refs = {};
Glyph.headPosition = { x: 0, y: 0 };
//# sourceMappingURL=Glyph.js.map