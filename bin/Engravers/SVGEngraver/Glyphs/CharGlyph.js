import { SVG, Glyph } from './index.js';
export class CharGlyph extends Glyph {
    constructor(charName, type, id = 'none') {
        super(type, id);
        this.draw = () => {
            this.textSVG = new SVG('text');
            let codePoints = Glyph.meta.glyphnames[this.charName];
            if (!codePoints || !codePoints.codepoint) {
                throw new Error(`code point not exist for ${this.charName}`);
            }
            this.textSVG.addClass('glyph');
            this.textSVG.text(codePoints.codepoint);
            this.append(this.textSVG);
        };
        this.charName = charName;
        this.draw();
    }
}
//# sourceMappingURL=CharGlyph.js.map