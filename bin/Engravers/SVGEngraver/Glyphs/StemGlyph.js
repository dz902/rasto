import { Glyph, RectGlyph } from './index.js';
export class StemFlagGlyph extends RectGlyph {
    constructor(height) {
        super();
        this.stemWidth = Glyph.meta.defaults.stemThickness;
        this.height = height;
    }
    get width() {
        return this.stemWidth;
    }
    get height() {
        return this.stemHeight;
    }
    set height(height) {
        this.size(this.width, height);
        this.stemHeight = height;
    }
    invert() {
        this.translate(undefined, -this.height);
    }
}
//# sourceMappingURL=StemGlyph.js.map