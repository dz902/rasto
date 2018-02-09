"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Glyphs_1 = require("Engravers/SVGEngraver/Glyphs");
const Music_1 = require("Schema/Music");
class MeasureGlyph extends Glyphs_1.Glyph {
    constructor(measure, context) {
        super('measure', measure.id);
        this.measure = measure;
        this.draw = () => {
            this.measure.marks.forEach((mark) => {
                // this relies on parser to make sure context refers to same object
                // probably should make it more generic
                let noContext = this.currentContext === undefined;
                let contextChanged = (mark.context !== this.currentContext);
                if (noContext || contextChanged) {
                    this.applyContextChange(mark.context, this.currentContext);
                }
                if (mark instanceof Music_1.Chord) {
                    this.drawChord(mark);
                }
                else if (mark instanceof Music_1.Rest) {
                    this.append(new Glyphs_1.RestGlyph(mark));
                }
                else {
                    throw new Error();
                }
            });
            // drawBarline
        };
        if (context) {
            this.currentContext = context;
        }
        this.draw();
    }
    drawChord(chord) {
        let chordGlyph = new Glyphs_1.ChordGlyph(chord);
        this.advance(chordGlyph, 5);
        this.append(chordGlyph);
    }
    drawClef(clefSign, clefLine) {
        let clefGlyph = new Glyphs_1.ClefGlyph(clefSign, clefLine);
        this.append(clefGlyph);
    }
    drawTime(timeBeats, timeBeatType) {
        let timeGlyph = new Glyphs_1.TimeGlyph(timeBeats, timeBeatType);
        this.advance(timeGlyph, 5);
        this.append(timeGlyph);
    }
    applyContextChange(newContext, oldContext) {
        this.currentContext = newContext;
        let clefDiff;
        let timeDiff;
        let isInitialContext = (oldContext === undefined);
        if (isInitialContext) {
            clefDiff = newContext;
            timeDiff = newContext;
        }
        else {
            clefDiff = Music_1.diff(['clefSign', 'clefLine'], oldContext, newContext);
            timeDiff = Music_1.diff(['timeBeats', 'timeBeatType'], oldContext, newContext);
        }
        ;
        if (clefDiff) {
            this.drawClef(clefDiff.clefSign, clefDiff.clefLine);
        }
        if (timeDiff) {
            this.drawTime(timeDiff.timeBeats, timeDiff.timeBeatType);
        }
    }
}
exports.MeasureGlyph = MeasureGlyph;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVhc3VyZUdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvTWVhc3VyZUdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQWtHO0FBQ2xHLHdDQUFrRztBQUVsRyxrQkFBMEIsU0FBUSxjQUFLO0lBR25DLFlBQW9CLE9BQWdCLEVBQUUsT0FBd0I7UUFDMUQsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFEYixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBVTFCLFNBQUksR0FBRyxHQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUU7Z0JBQ3RDLG1FQUFtRTtnQkFDbkUsdUNBQXVDO2dCQUV2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQztnQkFDbEQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFNUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksYUFBSyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekIsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFlBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxrQkFBUyxDQUFDLElB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