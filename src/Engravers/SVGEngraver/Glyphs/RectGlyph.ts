import { SVG, Glyph } from './index.js';

export class RectGlyph extends Glyph {
    protected rectSVG: SVG;

    constructor(type?: string, id?: string) {
        super(type, id);

        this.draw();
    }

    size(width: number, height: number): RectGlyph {
        this.rectSVG.size(width*Glyph.STAFF_SPACE, height*Glyph.STAFF_SPACE);

        return this;
    }

    protected set attachPoints(attachPoints: {x: number, y: number}) {
        this.translate(attachPoints.x, attachPoints.y);
    }

    protected draw = (): void => {
        this.rectSVG = new SVG('rect');

        this.append(this.rectSVG);
    }
}