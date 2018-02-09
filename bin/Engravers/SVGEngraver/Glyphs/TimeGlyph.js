"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class TimeGlyph extends _1.Glyph {
    constructor(beat, beatType) {
        super('time');
        this.beat = beat;
        this.beatType = beatType;
        this.drawBeat();
        this.drawBeatType();
        this.alignBeatDigits();
    }
    drawBeat() {
        this.beatGlyph = new _1.Glyph('time-beat');
        this.append(this.beatGlyph);
        let beatGlyphSize = { width: 0, height: 0 };
        // checkDoubleDigitBeat
        let isDoubleDigit = this.beat >= 10;
        if (isDoubleDigit) {
            // drawBeatTen
            let beatGlyphTen = new _1.CharGlyph('time', 1);
            beatGlyphTen.shiftFromStaffBottom(3);
            this.beatGlyph.append(beatGlyphTen);
            beatGlyphSize.width += beatGlyphTen.width;
            beatGlyphSize.height = beatGlyphTen.height;
        }
        // drawBeatDigit
        let digitBeat = this.beat % 10;
        let beatGlyphDigit = new _1.CharGlyph('time', digitBeat);
        beatGlyphDigit.shiftFromStaffBottom(3);
        this.beatGlyph
            .append(beatGlyphDigit);
        // checkDigitBeatOffset
        beatGlyphDigit.move(beatGlyphSize.width);
        beatGlyphSize.width += beatGlyphDigit.width;
        beatGlyphSize.height = Math.max(beatGlyphSize.height, beatGlyphDigit.height);
        this.beatGlyph.size(beatGlyphSize.width, beatGlyphSize.height);
    }
    drawBeatType() {
        this.beatTypeGlyph = new _1.Glyph('time-beat-type');
        this.append(this.beatTypeGlyph);
        let beatTypeDigitGlyph = new _1.CharGlyph('time', this.beatType);
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
exports.TimeGlyph = TimeGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZUdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvVGltZUdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0JBQXFDO0FBRXJDLGVBQXVCLFNBQVEsUUFBSztJQUloQyxZQUFvQixJQUFZLEVBQVUsUUFBZ0I7UUFDdEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBREUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFHdEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVCLElBQUksYUFBYSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFFNUMsdUJBQXVCO1FBRXZCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsY0FBYztZQUVkLElBQUksWUFBWSxHQUFHLElBQUksWUFBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU1QyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFcEMsYUFBYSxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxDQUFDO1FBRUQsZ0JBQWdCO1FBRWhCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksY0FBYyxHQUFHLElBQUksWUFBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV0RCxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFNBQVM7YUFDVCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFNUIsdUJBQXVCO1FBRXZCLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpDLGFBQWEsQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQztRQUM1QyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVPLFlBQVk7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxZQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5RCxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sZUFBZTtRQUNuQixJQUFJLFdBQWtCLENBQUM7UUFDdkIsSUFBSSxZQUFtQixDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsRCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM5QixXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFNUIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFyRkQsOEJBcUZDIn0=