import { SVG, Glyph } from './';

export class CharGlyph extends Glyph {
    protected textSVG: SVG;
    protected glyphKey: string;

    constructor(type: string, key: string | number, id?: string) {
        super(type, id);

        this.glyphKey = String(key);  // number is ok
        this.textSVG = new SVG('text');

        // setNominalSize

        let nominalSize = Glyph.meta.getGlyphSize(type, key);
        this.size(nominalSize.width, nominalSize.height);

        this.draw();
    }

    protected draw = (): void => {

        let codePoints = Glyph.meta.getGlyphCodePoints(this.type, this.glyphKey);

        this.textSVG.addClass('glyph').addClass((this.type));
        this.textSVG.text(codePoints.codepoint);

        this.append(this.textSVG);
    };
}