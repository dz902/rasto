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
    size(width, height) {
        this.rectSVG.size(width * Glyph.STAFF_SPACE, height * Glyph.STAFF_SPACE);
        return this;
    }
}
//# sourceMappingURL=RectGlyph.js.map