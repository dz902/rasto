import { Glyph, CharGlyph } from './index.js';
export class TimeGlyph extends Glyph {
    constructor(beat, beatType) {
        super('time');
        this.beat = beat;
        this.beatType = beatType;
        this.drawBeat();
        this.drawBeatType();
    }
    drawBeat() {
        let beatGlyph = new CharGlyph('time', this.beat);
        beatGlyph.translate(undefined, 3);
        this.append(beatGlyph);
    }
    drawBeatType() {
        let beatGlyph = new CharGlyph('time', `${this.beatType}`);
        beatGlyph.translate(undefined, 1);
        this.append(beatGlyph);
    }
}
//# sourceMappingURL=TimeGlyph.js.map