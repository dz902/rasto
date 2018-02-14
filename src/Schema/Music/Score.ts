import { Chord, Container, Measure, ErrorMeasureOverflow, StaffItem } from 'Schema/Music';
import { last, Maybe } from 'Utilities';
import { Context } from './Context';

export class Score {
    private scoreMeasures: Measure[] = [new Measure()];
    private currentMeasure: Measure = this.scoreMeasures[0];

    get measures(): ReadonlyArray<Measure> {
        return Object.freeze(this.scoreMeasures);
    }

    addContext(context: Context) {
        this.currentMeasure.addContext(context);
    }

    addChord(chord: Chord) {
        try {
            this.currentMeasure.addChord(chord);
        } catch (e) {
            if (e instanceof ErrorMeasureOverflow) {
                let newMeasure = new Measure();

                this.scoreMeasures.push(newMeasure);
                this.currentMeasure = newMeasure;

                this.currentMeasure.addChord(chord);
            }
        }
    }
}