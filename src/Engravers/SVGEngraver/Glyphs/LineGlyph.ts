import { SVG, Glyph } from './index.js';

export class LineGlyph extends Glyph {
    protected lineSVG: SVG;

    constructor(type: string, id?: string) {
        super(type, id);

        this.draw();
    }

    size(length: number): LineGlyph {
        this.lineSVG
            .setAttribute('x1',0)
            .setAttribute('y1', 0)
            .setAttribute('x2', length*Glyph.STAFF_SPACE)
            .setAttribute('y2', 0);

        return this;
    }

    protected draw = (): void => {
        this.lineSVG = new SVG('line');

        this.append(this.lineSVG);
    }
}