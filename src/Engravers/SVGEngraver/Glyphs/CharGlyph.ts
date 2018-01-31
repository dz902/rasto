import { Glyph } from '../Glyphs.js';

export class CharGlyph extends Glyph {
    constructor(protected type: string,
                protected id: string,
                protected charName: string) {
        super(type, id);

        this.draw();
    }

    protected draw = (): void => {
        let textElement = Glyph.createElement('text');
        let codePoints = Glyph.meta.glyphnames[this.charName];

        if (!codePoints.codepoint) {
            throw new Error();
        }

        textElement.classList.add('glyph');
        textElement.textContent = codePoints.codepoint;

        this.rawElement.appendChild(textElement);
    };
}