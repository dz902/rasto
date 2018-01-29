import { MusicalElement } from '../Music.js';
export default class Measure extends MusicalElement {
    constructor(id, timeBeats, timeBeatUnit, clefSign, clefLine) {
        super(id);
        this.id = id;
        this.notes = [];
        this.timeBeats = timeBeats;
        this.timeBeatUnit = timeBeatUnit;
        this.clefSign = clefSign;
        this.clefLine = clefLine;
    }
}
//# sourceMappingURL=Measure.js.map