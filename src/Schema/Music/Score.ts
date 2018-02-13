import { Chord, Container, Measure, ErrorMeasureOverflow, StaffItem } from 'Schema/Music';
import { last } from 'Utilities';
import { Context } from './Context';

export class Score extends Container<StaffItem> {
    protected scoreMeasures: Measure[] = [];

    get measures(): ReadonlyArray<Measure> {
        return Object.freeze(this.scoreMeasures);
    }

    addItem(staffItem: StaffItem): Score {
        let currentMeasure = last(this.scoreMeasures);

        if (currentMeasure === undefined) {
            currentMeasure = new Measure();
            this.scoreMeasures.push(currentMeasure);
        }

        if (staffItem instanceof Chord) {
            try {
                currentMeasure.addChord(staffItem);
            } catch (e) {
                if (e instanceof ErrorMeasureOverflow) {
                    currentMeasure = new Measure();
                    currentMeasure.addChord(staffItem);
                }
            }
        } else if (staffItem instanceof Context) {
            currentMeasure.addContext(staffItem);
        } else {
            throw new Error('unrecognized staff item');
        }


        return this;
    }
}