import { SVG, Glyph } from './index.js';

export class CharGlyph extends Glyph {
    protected textSVG: SVG;
    protected glyphKey: string;

    constructor(type: string, key: string | number, id?: string) {
        super(type, id);

        this.glyphKey = String(key);  // number is ok

        this.draw();
    }

    protected draw = (): void => {
        this.textSVG = new SVG('text');

        let codePoints = Glyph.meta.getGlyphCodePoints(this.type, this.glyphKey);

        this.textSVG.addClass('glyph').addClass((this.type));
        this.textSVG.text(codePoints.codepoint);

        this.append(this.textSVG);
    };
}