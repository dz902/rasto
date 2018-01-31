import { SVG, Glyph } from './index.js';
export class LineGlyph extends Glyph {
    constructor(type, id) {
        super(type, id);
        this.draw = () => {
            this.lineSVG = new SVG('line');
            this.append(this.lineSVG);
        };
        this.draw();
    }
    size(length) {
        this.lineSVG
            .setAttribute('x1', 0)
            .setAttribute('y1', 0)
            .setAttribute('x2', length * Glyph.STAFF_SPACE)
            .setAttribute('y2', 0);
        return this;
    }
}
//# sourceMappingURL=LineGlyph.js.map