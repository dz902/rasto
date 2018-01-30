import { Glyph, ChordGlyph, RestGlyph } from '../Glyphs.js';
import { Chord, Rest } from '../../../Schema/Music.js';
export class MeasureGlyph extends Glyph {
    constructor(measure) {
        super('measure', measure.id);
        this.measure = measure;
        this.draw = () => {
            this.measure.marks.forEach((mark) => {
                if (mark instanceof Chord) {
                    this.append(new ChordGlyph(mark));
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
}
//# sourceMappingURL=MeasureGlyph.js.map