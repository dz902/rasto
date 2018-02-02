import { SVG } from './index.js';
import * as SMuFL from '../../../Schema/SMuFL.js';
export class Glyph extends SVG {
    // INSTANCE
    constructor(type, id) {
        super('svg');
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
            Glyph.refs[this.id] = this.rawElement;
        };
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
    advance(x) {
        Glyph.headPosition.x += x;
        this.move(Glyph.headPosition.x);
        return this;
    }
    shift(y) {
        Glyph.headPosition.y = -y; // 4 = line 1, 3 = line 2, etc.
        this.move(undefined, Glyph.headPosition.y);
    }
    shiftFromStaffBottom(y) {
        Glyph.headPosition.y = 4 - y; // 4 = line 1, 3 = line 2, etc.
        this.move(undefined, Glyph.headPosition.y);
    }
    // OVERRIDE WITH NEW UNITS
    move(x, y) {
        super.move(x ? x * Glyph.STAFF_SPACE : undefined, y ? y * Glyph.STAFF_SPACE : undefined);
        return this;
    }
    translate(x, y) {
        super.translate(x ? x * Glyph.STAFF_SPACE : 0, y ? y * Glyph.STAFF_SPACE : 0);
        return this;
    } // should remove translate, it is the same as move
    rotate(angle, cx, cy) {
        cx = cx !== undefined ? cx : 0;
        cy = cy !== undefined ? cy : 0;
        super.rotate(angle, cx * Glyph.STAFF_SPACE, cy * Glyph.STAFF_SPACE);
        return this;
    }
    size(width, height) {
        super.size(width * Glyph.STAFF_SPACE, height * Glyph.STAFF_SPACE);
        return this;
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
Glyph.headPosition = { x: 0, y: 0 };
//# sourceMappingURL=Glyph.js.map