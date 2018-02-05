import { Note, Rest, MusicalElement, SimpleMap, Mark, Chord, maybe, maybeThen, ensureNumber, NumericValue } from './index.js';

export class Measure extends MusicalElement {
    readonly attributesList: MeasureAttributes[] = [];
    readonly marks: Mark[] = [];

    get currentAttributes(): MeasureAttributes {
        return this.attributesList[this.attributesList.length-1];
    }

    addAttributes(a: SimpleMap) {
        // ensureMeasureAttributes

        let attributes: MeasureAttributes = {};

        attributes.divisions = maybeThen(a.divisions, ensureNumber);
        attributes.timeBeats = maybeThen(a.timeBeats, ensureNumber);
        attributes.timeBeatType = maybeThen(a.timeBeatType, ensureNumber);
        attributes.clefSign = maybe(a.clefSign);
        attributes.clefLine = maybeThen(a.clefLine, ensureNumber);

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