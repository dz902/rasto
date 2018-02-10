import { Glyph, CharGlyph } from '.';

export class TimeGlyph extends Glyph {
    private beatGlyph: Glyph;
    private beatTypeGlyph: Glyph;

    constructor(private beat: number,
                private beatType: number) {
        super('time');

        this.beatGlyph = this.drawBeat();
        this.beatTypeGlyph = this.drawBeatType();
        this.alignBeatDigits();
    }

    private drawBeat(): Glyph {
        let beatGlyph = new Glyph('time-beat');

        this.append(beatGlyph);

        let beatGlyphSize = { width: 0, height: 0 };

        // checkDoubleDigitBeat

        let isDoubleDigit = this.beat >= 10;

        if (isDoubleDigit) {
            // drawBeatTen

            let beatGlyphTen = new CharGlyph('time', 1);

            beatGlyphTen.shiftFromStaffBottom(3);

            beatGlyph.append(beatGlyphTen);

            beatGlyphSize.width += beatGlyphTen.width;
            beatGlyphSize.height = beatGlyphTen.height;
        }

        // drawBeatDigit

        let digitBeat = this.beat % 10;
        let beatGlyphDigit = new CharGlyph('time', digitBeat);

        beatGlyphDigit.shiftFromStaffBottom(3);

        beatGlyph.append(beatGlyphDigit);

        // checkDigitBeatOffset

        beatGlyphDigit.move(beatGlyphSize.width);

        beatGlyphSize.width += beatGlyphDigit.width;
        beatGlyphSize.height = Math.max(beatGlyphSize.height, beatGlyphDigit.height);

        beatGlyph.size(beatGlyphSize.width, beatGlyphSize.height);

        return beatGlyph;
    }

    private drawBeatType(): Glyph {
        let beatTypeGlyph = new Glyph('time-beat-type');
        this.append(beatTypeGlyph);

        let beatTypeDigitGlyph = new CharGlyph('time', this.beatType);

        beatTypeDigitGlyph.shiftFromStaffBottom(1);

        beatTypeGlyph.size(beatTypeDigitGlyph.width, beatTypeDigitGlyph.height);
        beatTypeGlyph.append(beatTypeDigitGlyph);

        return beatTypeGlyph;
    }

    private alignBeatDigits(): void {
        let longerGlyph: Glyph;
        let shorterGlyph: Glyph;

        if (this.beatGlyph.width > this.beatTypeGlyph.width) {
            longerGlyph = this.beatGlyph;
            shorterGlyph = this.beatTypeGlyph;
        } else {
            shorterGlyph = this.beatGlyph;
            longerGlyph = this.beatTypeGlyph;
        }

        let widthDiff = longerGlyph.width - shorterGlyph.width;
        let offsetX = widthDiff / 2;

        shorterGlyph.move(offsetX);
    }
}