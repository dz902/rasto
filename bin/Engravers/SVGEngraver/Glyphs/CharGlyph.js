import { SVG, Glyph } from '../Glyphs.js';
export class CharGlyph extends Glyph {
    constructor(type, id, charName) {
        super(type, id);
        this.type = type;
        this.id = id;
        this.charName = charName;
        this.draw = () => {
            let textElement = new SVG('text');
            let codePoints = Glyph.meta.glyphnames[this.charName];
            if (!codePoints.codepoint) {
                throw new Error();
            }
            textElement.addClass('glyph');
            textElement.text(codePoints.codepoint);
            this.append(textElement);
        };
        this.draw();
    }
}
//# sourceMappingURL=CharGlyph.js.map