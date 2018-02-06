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
        this.size(width);
        this.rectSVG.width = Number(this.rawElement.getAttribute('width')); // UGLY
    }
    get height() {
        return super.height;
    }
    set height(height) {
        this.size(undefined, height);
        this.rectSVG.height = Number(this.rawElement.getAttribute('height')); // UGLY
    }
}
//# sourceMappingURL=RectGlyph.js.map