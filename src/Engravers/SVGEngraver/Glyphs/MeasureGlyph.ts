import { ChordGlyph, ClefGlyph, Glyph, RestGlyph, TimeGlyph } from './';
import { Maybe, SimpleMap, Chord, Mark, Measure, MeasureContext, Rest, diff } from '../../../Schema/Music';

export class MeasureGlyph extends Glyph {
    private context: MeasureContext;

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

        this.advance(chordGlyph,5);

        this.append(chordGlyph);
    }

    private drawClef(clefSign: string, clefLine: number): void {
        let clefGlyph = new ClefGlyph(clefSign, clefLine);

        this.append(clefGlyph);
    }

    private drawTime(timeBeats: number, timeBeatType: number): void {
        let timeGlyph = new TimeGlyph(timeBeats, timeBeatType);
        
        this.advance(timeGlyph,5);

        this.append(timeGlyph);
    }

    private applyContextChange(newContext: MeasureContext, oldContext?: MeasureContext): void {
        this.context = newContext;

        let clefDiff: Maybe<SimpleMap>;
        let timeDiff: Maybe<SimpleMap>;
        let isInitialContext = (oldContext === undefined);

        if (isInitialContext) {
            clefDiff = newContext;
            timeDiff = newContext;
        } else {
            clefDiff = diff(['clefSign', 'clefLine'], oldContext!, newContext);
            timeDiff = diff(['timeBeats', 'timeBeatType'], oldContext!, newContext);
        };

        if (clefDiff) {
            this.drawClef(clefDiff.clefSign!, clefDiff.clefLine!);
        }

        if (timeDiff) {
            this.drawTime(timeDiff.timeBeats!, timeDiff.timeBeatType!);
        }
    }
}


;