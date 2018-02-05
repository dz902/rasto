import { Glyph, CharGlyph } from './index.js';
export class TimeGlyph extends Glyph {
    constructor(beat, beatType) {
        super('time');
        this.beat = beat;
        this.beatType = beatType;
        this.drawBeat();
        this.drawBeatType();
        this.alignBeatDigits();
    }
    drawBeat() {
        this.beatGlyph = new Glyph('time-beat');
        this.append(this.beatGlyph);
        // checkDoubleDigitBeat
        let isDoubleDigit = this.beat >= 10;
        if (isDoubleDigit) {
            // drawBeatTen
            let beatGlyphTen = new CharGlyph('time', 1);
            beatGlyphTen.shiftFromStaffBottom(3);
            this.beatGlyph.append(beatGlyphTen);
        }
        // drawBeatDigit
        let digitBeat = this.beat % 10;
        let beatGlyphDigit = new CharGlyph('time', digitBeat);
        beatGlyphDigit.shiftFromStaffBottom(3);
        this.beatGlyph
            .append(beatGlyphDigit);
        // checkDigitBeatOffset
        if (isDoubleDigit) {
            let beatGlyphOneWidth = Glyph.meta.getGlyphSize('time', 1).width;
            beatGlyphDigit.move(beatGlyphOneWidth);
        }
    }
    drawBeatType() {
        this.beatTypeGlyph = new Glyph('time-beat-type');
        this.append(this.beatTypeGlyph);
        let beatTypeDigitGlyph = new CharGlyph('time', this.beatType);
        beatTypeDigitGlyph.shiftFromStaffBottom(1);
        this.beatTypeGlyph.append(beatTypeDigitGlyph);
    }
    alignBeatDigits() {
        let longerGlyph;
        let shorterGlyph;
        if (this.beatGlyph.width > this.beatTypeGlyph.width) {
            longerGlyph = this.beatGlyph;
            shorterGlyph = this.beatTypeGlyph;
        }
        else {
            shorterGlyph = this.beatGlyph;
            longerGlyph = this.beatTypeGlyph;
        }
        let widthDiff = longerGlyph.width - shorterGlyph.width;
        let offsetX = widthDiff / 2;
        shorterGlyph.move(offsetX);
    }
}
//# sourceMappingURL=TimeGlyph.js.map