import { SVG } from '../Glyphs.js';

import * as SMuFL from '../../../Schema/SMuFL.js';

const EM = 32;
const STAFF_SPACE = 0.25 * EM;

export class Glyph extends SVG {
    // STATIC

    protected static meta: SMuFL.CombinedMeta;
    protected static refs: { [id: string]: SVGGraphicsElement } = {};
    protected static headPosition: { x: number, y: number} = { x: 0, y: 0 };

    // INSTANCE

    constructor(protected type: string,
                protected id: string) {
        super('svg');

        Glyph.meta = SMuFL.load('Bravura');

        this.draw();
    }

    // DRAW

    protected draw = (): void => {
        // has to keep strange syntax to get correct this.draw()
        // there are no other way to automatically call the right draw()
        // keeping explicit draw() calls make code more readable
        // so do not refactor

        this.rawElement.classList.add(`id-${this.id}`);
        this.rawElement.classList.add(this.type);

        Glyph.refs[this.id] = this.rawElement;
    };

    // GLYPH OPS

    advance(x: number): Glyph {
        Glyph.headPosition.x += x;

        this.move(Glyph.headPosition.x);

        return this;
    }

    // OVERRIDE WITH NEW UNITS

    move(x?: number, y?: number): Glyph {
        super.move(x ? x*STAFF_SPACE : undefined, y ? y*STAFF_SPACE : undefined);

        return this;
    }

    translate(x?: number, y?: number): Glyph {
        super.translate(x ? x*STAFF_SPACE : undefined, y ? y*STAFF_SPACE : undefined);

        return this;
    }
}