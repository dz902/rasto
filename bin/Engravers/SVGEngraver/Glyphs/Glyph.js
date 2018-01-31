import { SVG } from '../Glyphs.js';
import * as SMuFL from '../../../Schema/SMuFL.js';
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
export class Glyph extends SVG {
    // INSTANCE
    constructor(type, id) {
        super('svg');
        this.type = type;
        this.id = id;
        // DRAW
        this.draw = () => {
            // has to keep strange syntax to get correct this.draw()
            // there are no other way to automatically call the right draw()
            // keeping explicit draw() calls make code more readable
            // so do not refactor
            this.rawElement.classList.add(`id-${this.id}`);
            this.rawElement.classList.add(this.type);
            Glyph.refs[this.id] = this.rawElement;
        };
        Glyph.meta = SMuFL.load('Bravura');
        this.draw();
    }
    // GLYPH OPS
    advance(x) {
        Glyph.headPosition.x += x;
        this.move(Glyph.headPosition.x);
        return this;
    }
    // OVERRIDE WITH NEW UNITS
    move(x, y) {
        super.move(x ? x * STAFF_SPACE : undefined, y ? y * STAFF_SPACE : undefined);
        return this;
    }
    translate(x, y) {
        super.translate(x ? x * STAFF_SPACE : undefined, y ? y * STAFF_SPACE : undefined);
        return this;
    }
}
Glyph.refs = {};
Glyph.headPosition = { x: 0, y: 0 };
//# sourceMappingURL=Glyph.js.map