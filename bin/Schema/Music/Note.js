"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Note extends _1.MusicalElement {
    constructor(type, pitchOctave, pitchStep, pitchAlter, duration) {
        super();
        this.beams = [];
        this.type = _1.ensureMarkType(type);
        this.pitchOctave = ensurePitchOctave(pitchOctave);
        this.pitchStep = ensurePitchStep(pitchStep);
        this.pitchAlter = pitchAlter;
        this.duration = duration;
        this.stem = new _1.Stem("up");
    }
    get accidental() {
        return this.noteAccidental;
    }
    get staffPlace() {
        // absoluteStaffPlace
        return this.pitchOctave * 7 + 'CDEFGAB'.indexOf(this.pitchStep);
    }
    addBeam(beam) {
        this.beams.push(beam);
    }
    addAccidental(accidental) {
        this.noteAccidental = accidental;
    }
    configureStem(stem) {
    }
    getIntervalTo(note) {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}
exports.Note = Note;
function ensurePitchStep(pitchStep) {
    return _1.ensure(pitchStep, `pitch step ${pitchStep} is not valid pitch step`, (p) => (p !== '' && 'ABCDEFG'.indexOf(p) !== -1));
}
function ensurePitchOctave(pitchOctave) {
    let p = _1.ensureNumber(pitchOctave);
    return _1.ensure(p, `pitch step ${pitchOctave} is not valid pitch step`, (p) => (p >= 0 && p <= 9));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TY2hlbWEvTXVzaWMvTm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUFnSTtBQUVoSSxVQUFrQixTQUFRLGlCQUFjO0lBV3BDLFlBQVksSUFBWSxFQUNaLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLFVBQXlCLEVBQ3pCLFFBQWdCO1FBQ3hCLEtBQUssRUFBRSxDQUFDO1FBVkgsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQVl4QixJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YscUJBQXFCO1FBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQXNCO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBVTtJQUN4QixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQVU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSjtBQW5ERCxvQkFtREM7QUFJRCx5QkFBeUIsU0FBaUI7SUFDdEMsTUFBTSxDQUFDLFNBQU0sQ0FBQyxTQUFTLEVBQUUsY0FBYyxTQUFTLDBCQUEwQixFQUM1RCxDQUFDLENBQVMsRUFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUUzRixDQUFDO0FBSUQsMkJBQTJCLFdBQXlCO0lBQ2hELElBQUksQ0FBQyxHQUFHLGVBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsU0FBTSxDQUFDLENBQUMsRUFBQyxjQUFjLFdBQVcsMEJBQTBCLEVBQ3JELENBQUMsQ0FBUyxFQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RFLENBQUMifQ==