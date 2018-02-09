"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Measure extends _1.MusicalElement {
    constructor() {
        super(...arguments);
        this.contexts = [];
        this.marks = [];
    }
    get currentContext() {
        return this.contexts[this.contexts.length - 1];
    }
    setContext(a) {
        // ensureMeasureAttributes
        let context = new MeasureContext(_1.maybeThen(a.divisions, _1.ensureNumber), _1.maybeThen(a.timeBeats, _1.ensureNumber), _1.maybeThen(a.timeBeatType, _1.ensureNumber), _1.maybe(a.clefSign), _1.maybeThen(a.clefLine, _1.ensureNumber));
        let prevContext = this.contexts[this.contexts.length - 1];
        if (prevContext) {
            context = context.merge(prevContext);
        }
        this.contexts.push(context);
    }
    addMark(mark) {
        this.marks.push(mark);
    }
}
exports.Measure = Measure;
class MeasureContext {
    constructor(divisions, timeBeats, timeBeatType, clefSign, clefLine) {
        this.divisions = divisions;
        this.timeBeats = timeBeats;
        this.timeBeatType = timeBeatType;
        this.clefSign = clefSign;
        this.clefLine = clefLine;
    }
    get bottomStaffPlace() {
        let staffPlace = 0;
        switch (this.clefSign) {
            case 'F':
                staffPlace = 2 * 7 - 1 + 5;
                break;
            case 'G':
                staffPlace = 4 * 7 - 1 + 3; // 4 octaves + 1 third
                break;
        }
        return staffPlace;
    }
    get midStaffPlace() {
        return this.bottomStaffPlace + 4;
    }
    merge(oldContext) {
        return new MeasureContext(or(this.divisions, oldContext.divisions), or(this.timeBeats, oldContext.timeBeats), or(this.timeBeatType, oldContext.timeBeatType), or(this.clefSign, oldContext.clefSign), or(this.clefLine, oldContext.clefLine));
    }
    sameAs(otherContext) {
        let thisContext = this;
        for (let k in thisContext) {
            if (thisContext[k] !== otherContext[k]) {
                return false;
            }
        }
        return true;
    }
}
exports.MeasureContext = MeasureContext;
function or(a, b) {
    if (a !== undefined) {
        return a;
    }
    else {
        return b;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVhc3VyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TY2hlbWEvTXVzaWMvTWVhc3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUFzSDtBQUV0SCxhQUFxQixTQUFRLGlCQUFjO0lBQTNDOztRQUNhLGFBQVEsR0FBcUIsRUFBRSxDQUFDO1FBQ2hDLFVBQUssR0FBVyxFQUFFLENBQUM7SUE2QmhDLENBQUM7SUEzQkcsSUFBSSxjQUFjO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFVBQVUsQ0FBQyxDQUFZO1FBQ25CLDBCQUEwQjtRQUUxQixJQUFJLE9BQU8sR0FBbUIsSUFBSSxjQUFjLENBQzVDLFlBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLGVBQVksQ0FBQyxFQUNwQyxZQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxlQUFZLENBQUMsRUFDcEMsWUFBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsZUFBWSxDQUFDLEVBQ3ZDLFFBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQ2pCLFlBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLGVBQVksQ0FBQyxDQUN0QyxDQUFDO1FBRUYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFB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