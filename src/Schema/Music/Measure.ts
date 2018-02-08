import { Maybe, Rest, MusicalElement, SimpleMap, Mark, Chord, maybe, maybeThen, ensureNumber, NumericValue } from '.';

export class Measure extends MusicalElement {
    readonly attributesList: MeasureAttributes[] = [];
    readonly marks: Mark[] = [];

    get currentAttributes(): MeasureAttributes {
        return this.attributesList[this.attributesList.length-1];
    }

    addAttributes(a: SimpleMap) {
        // ensureMeasureAttributes

        let attributes: MeasureAttributes = {
            divisions: maybeThen(a.divisions, ensureNumber),
            timeBeats: maybeThen(a.timeBeats, ensureNumber),
            timeBeatType: maybeThen(a.timeBeatType, ensureNumber),
            clefSign: maybe(a.clefSign),
            clefLine: maybeThen(a.clefLine, ensureNumber)
        };

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
    divisions: Maybe<number>;
    timeBeats: Maybe<number>;
    timeBeatType: Maybe<number>;
    clefSign: Maybe<string>;
    clefLine: Maybe<number>;
};