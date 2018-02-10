import { SVG } from 'Engravers/SVGEngraver/Glyphs';

import * as SMuFL from 'Schema/SMuFL';
import { StaffPlace } from '../../../Schema/Music';

export class Glyph extends SVG {
    // STATIC

    protected static readonly EM: number = 32;
    protected static readonly STAFF_SPACE: number = Glyph.EM * 0.25;
    protected static meta: SMuFL.Meta = SMuFL.Meta.load();
    protected static refs: { [id: string]: Glyph } = {};
    protected id: string | undefined;
    protected type: string;

    // INSTANCE

    constructor(type?: string,
                id?: string,
                private headPosition: { x: number, y: number} = { x: 0, y: 0 }) { // this makes sure all subclasses gets its own copy
        super('svg');

        // checkType

        if (type !== undefined) {
            this.type = type;
        } else {
            this.type = this.constructor.name.match(/([a-z]+|[A-Z][a-z]+)/g)!
                            .splice(0, -1) // remove "glyph"
                            .join('-')
                            .toLowerCase();
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

            Glyph.refs[this.id] = this;
        }

        if (this.type) {
            this.addClass(this.type ? this.type : this.constructor.name);
        }

    };

    // GLYPH OPS

    // here is a huge catch, using super.width would trigger this.bbox
    // which instead of pointing to SVG.bbox, it uses child class bbox
    // and leads to double conversion of units, this is extremely
    // confusing, and no need to override width and height as they
    // rely only on bbox, override bbox solves the whole problem

    advance(childGlyph: Glyph, x: number) {
        this.headPosition.x += x;

        childGlyph.move(this.headPosition.x);
    }

    shift(y: number) {
        this.move(undefined, -y);
    }

    shiftInterval(interval: number) {
        this.move(undefined, -(interval-1) / 2); // interval starts with unison (1)
    }

    shiftFromStaffBottom(y: number) {
        this.move(undefined, 4 - y); // 4 = line 1, 3 = line 2, etc.
    }

    // OVERRIDE WITH NEW UNITS

    move(x?: number, y?: number): Glyph {
        super.move(x ? x*Glyph.STAFF_SPACE : undefined, y ? y*Glyph.STAFF_SPACE : undefined);

        return this;
    }

    rotate(angle: number, cx?: number, cy?: number): Glyph {
        cx = cx !== undefined ? cx : 0;
        cy = cy !== undefined ? cy : 0;

        super.rotate(angle, cx*Glyph.STAFF_SPACE, cy*Glyph.STAFF_SPACE);

        return this;
    }

    size(width?: number, height?: number): Glyph {
        super.size(
            width ? width*Glyph.STAFF_SPACE : undefined,
            height? height*Glyph.STAFF_SPACE : undefined
        );

        return this;
    }

    overlapsWith(targetGlyph: Glyph): boolean {
        return (
            this.bbox.x < (targetGlyph.bbox.x + targetGlyph.width) &&
            targetGlyph.bbox.x < (this.bbox.x + this.bbox.width) &&
            this.bbox.y < (targetGlyph.bbox.y + targetGlyph.height) &&
            targetGlyph.bbox.y < (this.bbox.y + this.height)
        );
    }

    get width(): number {
        return super.width / Glyph.STAFF_SPACE;
    }

    set width(width: number) {
        super.width = width * Glyph.STAFF_SPACE;
    }

    get height(): number {
        return super.height / Glyph.STAFF_SPACE;
    }

    set height(height: number) {
        super.height = height * Glyph.STAFF_SPACE;
    }

    get bbox(): SVGRect {
        let bbox = super.getBBox();

        return {
            x: bbox.x/Glyph.STAFF_SPACE,
            y: bbox.y/Glyph.STAFF_SPACE,
            width: bbox.width/Glyph.STAFF_SPACE,
            height: bbox.height/Glyph.STAFF_SPACE
        };
    }
}