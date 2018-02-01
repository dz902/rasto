import { SVG } from './index.js';

import * as SMuFL from '../../../Schema/SMuFL.js';

export class Glyph extends SVG {
    // STATIC

    protected static readonly EM: number = 32;
    protected static readonly STAFF_SPACE: number = Glyph.EM * 0.25;
    protected static meta: SMuFL.Meta = SMuFL.Meta.load();
    protected static refs: { [id: string]: SVGGraphicsElement } = {};
    protected static headPosition: { x: number, y: number} = { x: 0, y: 0 };
    protected id: string;
    protected type: string;

    // INSTANCE

    constructor(type?: string, id?: string) {
        super('svg');

        if (type !== undefined) {
            this.type = type;
        } else {
            this.type = this.constructor.name;
        }

        if (id !== undefined) {
            this.id = id;
        }

        this.draw();
    }

    // DRAW

    protected draw = (): void => {
        // has to keep strange syntax to get correct this.draw()
        // there are no other way to automatically call the right draw()
        // keeping explicit draw() calls make code more readable
        // so do not refactor

        if (this.id) {
            this.addClass(`id-${this.id}`);
        }

        if (this.type) {
            this.addClass(this.type ? this.type : this.constructor.name);
        }

        Glyph.refs[this.id] = this.rawElement;
    };

    // GLYPH OPS

    get width(): number {
        return super.width / Glyph.STAFF_SPACE;
    }

    get height(): number {
        return super.height / Glyph.STAFF_SPACE;
    }

    advance(x: number): Glyph {
        Glyph.headPosition.x += x;

        this.move(Glyph.headPosition.x);

        return this;
    }

    shift(y: number) {
        Glyph.headPosition.y = -y/2; // 4 = line 1, 3 = line 2, etc.

        this.move(undefined, Glyph.headPosition.y);
    }

    shiftFromStaffBottom(y: number) {
        Glyph.headPosition.y = 4 - y/2; // 4 = line 1, 3 = line 2, etc.

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