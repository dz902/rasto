import { SVG, Glyph } from './index.js';
export class CharGlyph extends Glyph {
    constructor(type, key, id) {
        super(type, id);
        this.draw = () => {
            this.textSVG = new SVG('text');
            let codePoints = Glyph.meta.getGlyphCodePoints(this.type, this.glyphKey);
            this.textSVG.addClass('glyph').addClass((this.type));
            this.textSVG.text(codePoints.codepoint);
            this.append(this.textSVG);
        };
        this.glyphKey = String(key); // number is ok
        // setNominalSize
        let nominalSize = Glyph.meta.getGlyphSize(type, key);
        this.size(nominalSize.width, nominalSize.height);
        this.draw();
    }
}
//# sourceMappingURL=CharGlyph.js.map