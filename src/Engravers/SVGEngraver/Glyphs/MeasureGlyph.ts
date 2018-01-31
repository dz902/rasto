import { Glyph, ChordGlyph, RestGlyph } from '../Glyphs.js';
import { Measure, Chord, Rest } from '../../../Schema/Music.js';

export class MeasureGlyph extends Glyph {
    constructor(private measure: Measure) {
        super('measure', measure.id);

        this.draw();
    }

    protected draw = (): void => {
        this.measure.marks.forEach((mark) => {
            if (mark instanceof Chord) {
                this.drawChord(mark);
            } else if (mark instanceof Rest) {
                this.append(new RestGlyph(mark));
            } else {
                throw new Error();
            }
        });
    }

    private drawChord(chord: Chord): void {
        let chordGlyph = new ChordGlyph(chord);

        chordGlyph.advance(10);

        this.append(chordGlyph);
    }
}