import { MusicalElement, maybe, maybeThen, ensureNumber } from './index.js';
export class Measure extends MusicalElement {
    constructor() {
        super(...arguments);
        this.attributesList = [];
        this.marks = [];
    }
    get currentAttributes() {
        return this.attributesList[this.attributesList.length - 1];
    }
    addAttributes(a) {
        // ensureMeasureAttributes
        let attributes = {};
        attributes.divisions = maybeThen(a.divisions, ensureNumber);
        attributes.timeBeats = maybeThen(a.timeBeats, ensureNumber);
        attributes.timeBeatType = maybeThen(a.timeBeatType, ensureNumber);
        attributes.clefSign = maybe(a.clefSign);
        attributes.clefLine = maybeThen(a.clefLine, ensureNumber);
        if (this.attributesList.length > 0) {
            attributes = Object.assign({}, this.attributesList[this.attributesList.length - 1], attributes); // inherit and overwrite
        }
        this.attributesList.push(attributes);
    }
    addMark(mark) {
        this.marks.push(mark);
    }
}
;
//# sourceMappingURL=Measure.js.map