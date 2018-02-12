import { Container, Measure, ErrorMeasureOverflow, StaffItem } from 'Schema/Music';
import { last } from 'Utilities';

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

        try {
            currentMeasure.addConstituentOrContext(staffItem);
        } catch (e) {
            if (e instanceof ErrorMeasureOverflow) {
                currentMeasure = new Measure();
                currentMeasure.addConstituentOrContext(staffItem);
            }
        }

        return this;
    }
}