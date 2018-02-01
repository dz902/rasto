import { SVG, Glyph } from './index.js';
export class CharGlyph extends Glyph {
    constructor(key, type, id) {
        super(type, id);
        this.draw = () => {
            this.textSVG = new SVG('text');
            let codePoints = Glyph.meta.getGlyphCodePoints(this.type, this.glyphKey);
            this.textSVG.addClass('glyph');
            this.textSVG.text(codePoints.codepoint);
            this.append(this.textSVG);
        };
        this.glyphKey = key;
        this.draw();
    }
}
//# sourceMappingURL=CharGlyph.js.map