import { SVG } from './index.js';

import * as SMuFL from '../../../Schema/SMuFL.js';

export class Glyph extends SVG {
    // STATIC

    protected static readonly EM: number = 32;
    protected static readonly STAFF_SPACE: number = Glyph.EM * 0.25;
    protected static meta: SMuFL.CombinedMeta;
    protected static refs: { [id: string]: SVGGraphicsElement } = {};
    protected static headPosition: { x: number, y: number} = { x: 0, y: 0 };

    // INSTANCE

    constructor(protected type: string,
                protected id: string = 'none') {
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

    shift(y: number) {
        Glyph.headPosition.y -= y/2;
        this.move(undefined, Glyph.headPosition.y);
    }

    // OVERRIDE WITH NEW UNITS

    move(x?: number, y?: number): Glyph {
        super.move(x ? x*Glyph.STAFF_SPACE : undefined, y ? y*Glyph.STAFF_SPACE : undefined);

        return this;
    }

    translate(x?: number, y?: number): Glyph {
        super.translate(x ? x*Glyph.STAFF_SPACE : undefined, y ? y*Glyph.STAFF_SPACE : undefined);

        return this;
    }
}