import { SVG, Glyph } from './index.js';

export class RectGlyph extends Glyph {
    protected rectSVG: SVG;

    constructor(type?: string, id?: string) {
        super(type, id);

        this.draw();
    }

    protected draw = (): void => {
        this.rectSVG = new SVG('rect');

        this.append(this.rectSVG);
    }

    get width() {
        return super.width;
    }

    set width(width: number) {
        this.rectSVG.setAttribute('width', width*Glyph.STAFF_SPACE);
    }

    get height() {
        return super.height;
    }

    set height(height: number) {
        this.rectSVG.setAttribute('height', height*Glyph.STAFF_SPACE);
    }
}