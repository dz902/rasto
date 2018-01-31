import { Note, Rest, MusicalElement, Attributes, Mark, Chord, maybe, ensureNumber, NumericValue } from './index.js';

export class Measure extends MusicalElement {
    readonly attributesList: MeasureAttributes[] = [];
    readonly marks: Mark[] = [];

    get currentAttributes(): MeasureAttributes {
        return this.attributesList[this.attributesList.length-1];
    }

    addAttributes(a: Attributes) {
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

export interface MeasureAttributes extends Attributes {
    divisions?: NumericValue;
    timeBeats?: NumericValue;
    timeBeatType?: NumericValue;
    clefSign?: string;
    clefLine?: NumericValue;
};