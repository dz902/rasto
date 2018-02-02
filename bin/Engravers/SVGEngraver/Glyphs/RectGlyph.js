import { SVG, Glyph } from './index.js';
export class RectGlyph extends Glyph {
    constructor(type, id) {
        super(type, id);
        this.draw = () => {
            this.rectSVG = new SVG('rect');
            this.append(this.rectSVG);
        };
        this.draw();
    }
    // pitfall here, when defining a setter, getter of the same name
    // is removed from inheritance, which means you will have to do
    // something really stupid like the following, setters could be
    // replaced by methods and should work, but it closes doors to
    // shortcuts like += / -=
    get width() {
        return super.width;
    }
    set width(width) {
        this.rectSVG.setAttribute('width', width * Glyph.STAFF_SPACE);
    }
    get height() {
        return super.height;
    }
    set height(height) {
        this.rectSVG.setAttribute('height', height * Glyph.STAFF_SPACE);
    }
}
//# sourceMappingURL=RectGlyph.js.map