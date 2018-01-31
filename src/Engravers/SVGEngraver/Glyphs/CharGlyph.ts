import { SVG, Glyph } from './index.js';

export class CharGlyph extends Glyph {
    protected textSVG: SVG;
    protected charName: string;

    constructor(charName: string, type: string, id: string = 'none') {
        super(type, id);

        this.charName = charName;

        this.draw();
    }

    protected draw = (): void => {
        this.textSVG = new SVG('text');

        let codePoints = Glyph.meta.glyphnames[this.charName];

        if (!codePoints.codepoint) {
            throw new Error();
        }

        this.textSVG.addClass('glyph');
        this.textSVG.text(codePoints.codepoint);

        this.append(this.textSVG);
    };
}