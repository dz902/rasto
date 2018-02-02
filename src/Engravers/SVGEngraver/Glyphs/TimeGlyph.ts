import { Glyph, CharGlyph } from './index.js';

export class TimeGlyph extends Glyph {
    constructor(private beat: number, private beatType: number) {
        super('time');

        this.drawBeat();
        this.drawBeatType();
    }

    private drawBeat(): void {
        let beatGlyph = new CharGlyph('time', this.beat);

        beatGlyph.translate(undefined, 3);

        this.append(beatGlyph);
    }

    private drawBeatType(): void {
        let beatGlyph = new CharGlyph('time', `${this.beatType}`);

        beatGlyph.translate(undefined, 1);

        this.append(beatGlyph);
    }
}