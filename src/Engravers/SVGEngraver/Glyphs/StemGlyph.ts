import { Glyph, RectGlyph } from './index.js';

export class StemFlagGlyph extends RectGlyph {
    private stemWidth: number = Glyph.meta.defaults.stemThickness;
    private stemHeight: number;

    constructor(height: number){
        super();

        this.height = height;
    }

    get width() {
        return this.stemWidth;
    }

    get height() {
        return this.stemHeight;
    }

    set height(height: number) {
        this.size(this.width, height);
        this.stemHeight = height;
    }

    invert(): void {
        this.translate(undefined, -this.height);
    }
}