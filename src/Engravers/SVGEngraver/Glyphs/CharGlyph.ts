import { SVG, Glyph } from './index.js';

export class CharGlyph extends Glyph {
    constructor(protected type: string,
                protected id: string,
                protected charName: string) {
        super(type, id);

        this.draw();
    }

    protected draw = (): void => {
        let textElement = new SVG('text');
        let codePoints = Glyph.meta.glyphnames[this.charName];

        if (!codePoints.codepoint) {
            throw new Error();
        }

        textElement.addClass('glyph');
        textElement.text(codePoints.codepoint);

        this.append(textElement);
    };
}