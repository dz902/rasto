"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const Music_1 = require("../../../Schema/Music");
class MeasureGlyph extends _1.Glyph {
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
                if (mark instanceof Music_1.Chord) {
                    this.drawChord(mark);
                }
                else if (mark instanceof Music_1.Rest) {
                    this.append(new _1.RestGlyph(mark));
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
        let chordGlyph = new _1.ChordGlyph(chord);
        this.advance(chordGlyph, 5);
        this.append(chordGlyph);
    }
    drawClef(clefSign, clefLine) {
        let clefGlyph = new _1.ClefGlyph(clefSign, clefLine);
        this.append(clefGlyph);
    }
    drawTime(timeBeats, timeBeatType) {
        let timeGlyph = new _1.TimeGlyph(timeBeats, timeBeatType);
        this.advance(timeGlyph, 5);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVhc3VyZUdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvTWVhc3VyZUdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXdFO0FBQ3hFLGlEQUEyRztBQUUzRyxrQkFBMEIsU0FBUSxRQUFLO0lBR25DLFlBQW9CLE9BQWdCO1FBQ2hDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRGIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQU0xQixTQUFJLEdBQUcsR0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFO2dCQUN0QyxtRUFBbUU7Z0JBQ25FLHVDQUF1QztnQkFFdkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM5QixJQUFJLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVyRCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxhQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksWUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsY0FBYztRQUNsQixDQUFDLENBQUE7UUF6QkcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUEwQk8sU0FBUyxDQUFDLEtBQVk7UUFDMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxhQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8sUUFBUSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxZQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFFBQVEsQ0FBQyxTQUFpQixFQUFFLFlBQW9CO1FBQ3BELElBQUksU0FBUyxHQUFHLElBQUksWUFBUyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxVQUEwQixFQUFFLFVBQTJCO1FBQzlFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBRTFCLElBQUksUUFBMEIsQ0FBQztRQUMvQixJQUFJLFFBQTBCLENBQUM7UUFDL0IsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUVsRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDbkIsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUN0QixRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzFCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFFBQVEsR0FBRyxZQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsVUFBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ25FLFFBQVEsR0FBRyxZQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLEVBQUUsVUFBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFBQSxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVMsRUFBRSxRQUFRLENBQUMsUUFBUyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFVLEVBQUUsUUFBUSxDQUFDLFlBQWEsQ0FBQyxDQUFDO1FBQy9ELENBQUM7SUFDTCxDQUFDO0NBQ0o7QUE5RUQsb0NBOEVDO0FBR0QsQ0FBQyJ9