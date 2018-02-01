import { Glyph, ChordGlyph, RestGlyph, ClefGlyph } from './index.js';
import { Measure, Mark, Chord, Rest, MeasureAttributes, Attributes } from '../../../Schema/Music/index.js';

export class MeasureGlyph extends Glyph {
    private context: MeasureAttributes;

    constructor(private measure: Measure) {
        super('measure', measure.id);

        this.draw();
    }

    protected draw = (): void => {
        this.measure.marks.forEach((mark: Mark) => {
            // this relies on parser to make sure context refers to same object
            // probably should make it more generic

            let noContext = !this.context;
            let contextChanged = (mark.context !== this.context);

            if (noContext || contextChanged) {
                this.applyContextChange(mark.context, this.context);
            }

            if (mark instanceof Chord) {
                this.drawChord(mark);
            } else if (mark instanceof Rest) {
                this.append(new RestGlyph(mark));
            } else {
                throw new Error();
            }
        });

        // drawBarline
    }

    private drawChord(chord: Chord): void {
        let chordGlyph = new ChordGlyph(chord);

        chordGlyph.advance(5);

        this.append(chordGlyph);
    }

    private drawClef(clefSign: string, clefLine: number): void {
        let clefGlyph = new ClefGlyph(clefSign, clefLine);

        this.append(clefGlyph);
    }

    private drawTime(timeBeats: number, timeBeatType: number): void {

    }

    private applyContextChange(newContext: MeasureAttributes, oldContext?: MeasureAttributes): void {
        this.context = newContext;

        let clefDiff: MeasureAttributes | null;
        let timeDiff: MeasureAttributes | null;
        let isInitialContext = (oldContext === undefined);

        if (isInitialContext) {
            clefDiff = newContext;
            timeDiff = newContext;
        } else {
            clefDiff = diff(['clefSign', 'clefLine'], oldContext!, newContext);
            timeDiff = diff(['timeBeats', 'timeBeatType'], oldContext!, newContext);
        };

        if (clefDiff !== null) {
            this.drawClef(clefDiff.clefSign!, clefDiff.clefLine!);
        }

        if (timeDiff !== null) {
            this.drawTime(timeDiff.timeBeats!, timeDiff.timeBeatType!);
        }
    }
}


function diff(keys: string[], a: MeasureAttributes, b: MeasureAttributes): Attributes | null {
    let isDiff = false;
    let result: Attributes = {};

    for (let k of keys) {
        if (b[k] !== a[k]) {
            isDiff = true;
            result[k] = b[k];
        } else {
            result[k] = a[k]; // still keep original key and value
        }
    }

    return isDiff ? result : null;
};