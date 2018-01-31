import { Glyph, MeasureGlyph } from '../Glyphs.js';
import { Score } from '../../../Schema/Music.js';

export class StaffGlyph extends Glyph {
    protected draw = () => {
        this.drawLine();
    }

    private drawLine() {
        let line = Glyph.createElement('rect');
    }
}