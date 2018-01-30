import { Glyph } from '../Glyphs.js';
export class CharGlyph extends Glyph {
    constructor(type, id, charName) {
        super(type, id);
        this.type = type;
        this.id = id;
        this.charName = charName;
        this.draw = () => {
            let textElement = Glyph.createElement('text');
            let codePoints = Glyph.meta.glyphnames[this.charName];
            if (!codePoints.codepoint) {
                throw new Error();
            }
            textElement.classList.add('glyph');
            textElement.textContent = codePoints.codepoint;
            this.rawElement.appendChild(textElement);
        };
        this.draw();
    }
}
//# sourceMappingURL=CharGlyph.js.map