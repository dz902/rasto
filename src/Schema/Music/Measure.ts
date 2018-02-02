import { Note, Rest, MusicalElement, SimpleMap, Mark, Chord, maybe, ensureNumber, NumericValue } from './index.js';

export class Measure extends MusicalElement {
    readonly attributesList: MeasureAttributes[] = [];
    readonly marks: Mark[] = [];

    get currentAttributes(): MeasureAttributes {
        return this.attributesList[this.attributesList.length-1];
    }

    addAttributes(a: SimpleMap) {
        // ensureMeasureAttributes

        let attributes: MeasureAttributes = {};

        attributes.divisions = maybe(a.divisions, ensureNumber);
        attributes.timeBeats = maybe(a.timeBeats, ensureNumber);
        attributes.timeBeatType = maybe(a.timeBeatType, ensureNumber);
        attributes.clefSign = maybe(a.clefSign);
        attributes.clefLine = maybe(a.clefLine, ensureNumber);

        if (this.attributesList.length > 0) {
            attributes = {...this.attributesList[this.attributesList.length-1], ...attributes}; // inherit and overwrite
        }

        this.attributesList.push(attributes);
    }

    addMark(mark: Mark) {
        this.marks.push(mark);
    }
}

export interface MeasureAttributes extends SimpleMap {
    divisions?: number;
    timeBeats?: number;
    timeBeatType?: number;
    clefSign?: string;
    clefLine?: number;
};