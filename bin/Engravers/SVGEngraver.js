import { SVG, ScoreGlyph } from './SVGEngraver/Glyphs.js';
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
export class SVGEngraver {
    static engrave(score) {
        let scoreGlyph = new ScoreGlyph(score);
        return (new SVG('svg')).append(scoreGlyph).element;
    }
}
//# sourceMappingURL=SVGEngraver.js.map