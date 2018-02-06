import { SVG } from './index.js';
import * as SMuFL from '../../../Schema/SMuFL.js';
export class Glyph extends SVG {
    // INSTANCE
    constructor(type, id, headPosition = { x: 0, y: 0 }) {
        super('svg');
        this.headPosition = headPosition;
        // DRAW
        this.draw = () => {
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
            Glyph.refs[this.id] = this;
        };
        // checkType
        if (type !== undefined) {
            this.type = type;
        }
        else {
            this.type = this.constructor.name.match(/([a-z]+|[A-Z][a-z]+)/g)
                .splice(0, -1) // remove "glyph"
                .join('-')
                .toLowerCase();
        }
        if (id !== undefined) {
            this.id = id;
        }
        this.draw();
    }
    // GLYPH OPS
    // here is a huge catch, using super.width would trigger this.bbox
    // which instead of pointing to SVG.bbox, it uses child class bbox
    // and leads to double conversion of units, this is extremely
    // confusing, and no need to override width and height as they
    // rely only on bbox, override bbox solves the whole problem
    advance(childGlyph, x) {
        this.headPosition.x += x;
        childGlyph.move(this.headPosition.x);
    }
    shift(y) {
        this.move(undefined, -y);
    }
    shiftInterval(interval) {
        this.move(undefined, -(interval - 1) / 2); // interval starts with unison (1)
    }
    shiftFromStaffBottom(y) {
        this.move(undefined, 4 - y); // 4 = line 1, 3 = line 2, etc.
    }
    // OVERRIDE WITH NEW UNITS
    move(x, y) {
        super.move(x ? x * Glyph.STAFF_SPACE : undefined, y ? y * Glyph.STAFF_SPACE : undefined);
        return this;
    }
    rotate(angle, cx, cy) {
        cx = cx !== undefined ? cx : 0;
        cy = cy !== undefined ? cy : 0;
        super.rotate(angle, cx * Glyph.STAFF_SPACE, cy * Glyph.STAFF_SPACE);
        return this;
    }
    size(width, height) {
        super.size(width ? width * Glyph.STAFF_SPACE : undefined, height ? height * Glyph.STAFF_SPACE : undefined);
        return this;
    }
    overlapsWith(targetGlyph) {
        return (this.bbox.x < (targetGlyph.bbox.x + targetGlyph.width) &&
            targetGlyph.bbox.x < (this.bbox.x + this.bbox.width) &&
            this.bbox.y < (targetGlyph.bbox.y + targetGlyph.height) &&
            targetGlyph.bbox.y < (this.bbox.y + this.height));
    }
    get width() {
        return super.width / Glyph.STAFF_SPACE;
    }
    set width(width) {
        super.width = width * Glyph.STAFF_SPACE;
    }
    get height() {
        return super.height / Glyph.STAFF_SPACE;
    }
    set height(height) {
        super.height = height * Glyph.STAFF_SPACE;
    }
    get bbox() {
        let bbox = super.bbox;
        return {
            x: bbox.x / Glyph.STAFF_SPACE,
            y: bbox.y / Glyph.STAFF_SPACE,
            width: bbox.width / Glyph.STAFF_SPACE,
            height: bbox.height / Glyph.STAFF_SPACE
        };
    }
}
// STATIC
Glyph.EM = 32;
Glyph.STAFF_SPACE = Glyph.EM * 0.25;
Glyph.meta = SMuFL.Meta.load();
Glyph.refs = {};
//# sourceMappingURL=Glyph.js.map