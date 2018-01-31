import { SVG, ScoreGlyph } from './SVGEngraver/Glyphs/index.js';
import { Score } from '../Schema/Music/index.js'; // FIX
import log from '../Utilities/Logger.js';

const EM = 32;
const STAFF_SPACE = 0.25 * EM;

export class SVGEngraver {
    static engrave(score: Score): SVGSVGElement {
        let scoreGlyph = new ScoreGlyph(score);

        return <SVGSVGElement> (new SVG('svg')).append(scoreGlyph).element;
    }
}