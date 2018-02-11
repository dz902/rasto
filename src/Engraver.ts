import { SVGRenderer } from 'Renderers/SVGRenderer';
import { Score } from 'Schema/Music';

export class Engraver {
    static load(score: Score): Engraver {
        return (new Engraver());
    }

    engravePart(score: Score) {

    }

    private constructor() {}
}