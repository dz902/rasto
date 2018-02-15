import { Chord, Container, Measure, ErrorMeasureOverflow, StaffItem } from 'Schema/Music';
import { last, Maybe } from 'Utilities';
import { Context } from './Context';

export class Score {
    private scoreMeasures: Measure[] = [new Measure()];

    get measures(): ReadonlyArray<Measure> {
        return Object.freeze(this.scoreMeasures);
    }

    get currentMeasure(): Measure {
        let measure = last(this.scoreMeasures);

        if (measure === undefined) {
            throw new Error('impossible error');
        }

        return measure;
    }

    addContext(context: Context) {
        this.currentMeasure.addContext(context);
    }

    addChord(chord: Chord) {
        try {
            this.currentMeasure.addChord(chord);
        } catch (e) {
            if (e instanceof ErrorMeasureOverflow) {
                this.addMeasure();
                this.currentMeasure.addChord(chord);
            }
        }
    }

    private addMeasure() {
        let newMeasure = new Measure();

        this.scoreMeasures.push(newMeasure);
    }
}