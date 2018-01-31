import { Glyph, ChordGlyph, RestGlyph } from './index.js';
import { Chord, Rest } from '../../../Schema/Music/index.js';
export class MeasureGlyph extends Glyph {
    constructor(measure) {
        super('measure', measure.id);
        this.measure = measure;
        this.draw = () => {
            this.measure.marks.forEach((mark) => {
                if (mark instanceof Chord) {
                    this.drawChord(mark);
                }
                else if (mark instanceof Rest) {
                    this.append(new RestGlyph(mark));
                }
                else {
                    throw new Error();
                }
            });
        };
        this.draw();
    }
    drawChord(chord) {
        let chordGlyph = new ChordGlyph(chord);
        chordGlyph.advance(10);
        this.append(chordGlyph);
    }
}
//# sourceMappingURL=MeasureGlyph.js.map