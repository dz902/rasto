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
    shift(y) {
        Glyph.headPosition.y -= y / 2;
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