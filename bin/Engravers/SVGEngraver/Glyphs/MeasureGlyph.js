import { ChordGlyph, ClefGlyph, Glyph, RestGlyph, TimeGlyph } from './index.js';
import { Chord, Rest, diff } from '../../../Schema/Music/index.js';
export class MeasureGlyph extends Glyph {
    constructor(measure) {
        super('measure', measure.id);
        this.measure = measure;
        this.draw = () => {
            this.measure.marks.forEach((mark) => {
                // this relies on parser to make sure context refers to same object
                // probably should make it more generic
                let noContext = !this.context;
                let contextChanged = (mark.context !== this.context);
                if (noContext || contextChanged) {
                    this.applyContextChange(mark.context, this.context);
                }
                if (mark instanceof Chord) {
                    this.drawChord(mark);
                }
                else if (mark instanceof Rest) {
                    this.append(new RestGlyph(mark));
                }
                else {
                    throw new Error();
                }
            });
            // drawBarline
        };
        this.draw();
    }
    drawChord(chord) {
        let chordGlyph = new ChordGlyph(chord);
        chordGlyph.advance(5);
        this.append(chordGlyph);
    }
    drawClef(clefSign, clefLine) {
        let clefGlyph = new ClefGlyph(clefSign, clefLine);
        this.append(clefGlyph);
    }
    drawTime(timeBeats, timeBeatType) {
        let timeGlyph = new TimeGlyph(timeBeats, timeBeatType);
        timeGlyph.advance(5);
        this.append(timeGlyph);
    }
    applyContextChange(newContext, oldContext) {
        this.context = newContext;
        let clefDiff;
        let timeDiff;
        let isInitialContext = (oldContext === undefined);
        if (isInitialContext) {
            clefDiff = newContext;
            timeDiff = newContext;
        }
        else {
            clefDiff = diff(['clefSign', 'clefLine'], oldContext, newContext);
            timeDiff = diff(['timeBeats', 'timeBeatType'], oldContext, newContext);
        }
        ;
        if (clefDiff !== null) {
            this.drawClef(clefDiff.clefSign, clefDiff.clefLine);
        }
        if (timeDiff !== null) {
            this.drawTime(timeDiff.timeBeats, timeDiff.timeBeatType);
        }
    }
}
;
//# sourceMappingURL=MeasureGlyph.js.map