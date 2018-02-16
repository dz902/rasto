import { Chord, Container, Measure, ErrorMeasureOverflow, StaffItem } from 'Schema/Music';
import { last, Maybe } from 'Utilities';
import { Context } from './Context';
import { Direction } from './Articulation';

export class Score {
    private scoreMeasures: Measure[] = [];
    private scoreDirections: Direction[] = [];

    get measures(): ReadonlyArray<Measure> {
        return Object.freeze(Array.from(this.scoreMeasures));
    }

    get directions(): ReadonlyArray<Direction> {
        return Object.freeze(Array.from(this.scoreDirections));
    }

    addMeasure(measure: Measure): Measure {
        this.scoreMeasures.push(measure);

        return measure;
    }

    addDirection(direction: Direction): Direction {
        this.scoreDirections.push(direction);

        return direction;
    }
}