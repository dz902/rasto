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
        let beatGlyphSize = { width: 0, height: 0 };
        // checkDoubleDigitBeat
        let isDoubleDigit = this.beat >= 10;
        if (isDoubleDigit) {
            // drawBeatTen
            let beatGlyphTen = new CharGlyph('time', 1);
            beatGlyphTen.shiftFromStaffBottom(3);
            this.beatGlyph.append(beatGlyphTen);
            beatGlyphSize.width += beatGlyphTen.width;
            beatGlyphSize.height = beatGlyphTen.height;
        }
        // drawBeatDigit
        let digitBeat = this.beat % 10;
        let beatGlyphDigit = new CharGlyph('time', digitBeat);
        beatGlyphDigit.shiftFromStaffBottom(3);
        this.beatGlyph
            .append(beatGlyphDigit);
        // checkDigitBeatOffset
        console.log(beatGlyphSize.width);
        beatGlyphDigit.move(beatGlyphSize.width);
        beatGlyphSize.width += beatGlyphDigit.width;
        beatGlyphSize.height = Math.max(beatGlyphSize.height, beatGlyphDigit.height);
        this.beatGlyph.size(beatGlyphSize.width, beatGlyphSize.height);
    }
    drawBeatType() {
        this.beatTypeGlyph = new Glyph('time-beat-type');
        this.append(this.beatTypeGlyph);
        let beatTypeDigitGlyph = new CharGlyph('time', this.beatType);
        beatTypeDigitGlyph.shiftFromStaffBottom(1);
        this.beatTypeGlyph.size(beatTypeDigitGlyph.width, beatTypeDigitGlyph.height);
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