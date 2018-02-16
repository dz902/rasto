import { Chord, Container, Measure, ErrorMeasureOverflow, StaffItem } from 'Schema/Music';
import { last, Maybe } from 'Utilities';
import { Context } from './Context';
import { Direction } from './Articulation';
import { MeasureContext } from './Measure';

export class Score extends Container<StaffItem> {
    private currentMeasureContexts: MeasureContext[] = [];
    private scoreDirections: Direction[] = [];

    get measures(): ReadonlyArray<Measure> {
    }

    get directions(): ReadonlyArray<Direction> {
        return Object.freeze(Array.from(this.scoreDirections));
    }

    addMeasure(measure: Measure): this {
        let inheritedContext: MeasureContext[];
        let lastMeasure = last(this.measures);

        if (lastMeasure !== undefined) {
            inheritedContext = lastMeasure.tailContext;
        }

        this.addItem(new ScoreMeasure(measure, inheritedContext));

        return this;
    }

    addDirection(direction: Direction): void {
        this.scoreDirections.push(direction);
    }

    addChord(chord: Chord, staffNumber: number = 0) {
        let currentMeasureContext = this.currentMeasureContexts[staffNumber];
        let contextNotSet = currentMeasureContext === undefined;

        if (contextNotSet) {
            throw new Error('chords cannot be added before setting a context');
        }

        super.addItem(new MeasureChord(chord, this.currentMeasureContexts[staffNumber]));
    }

    addContext(context: Context, staffNumber: number = 0) {
        let currentMeasureContext = this.currentMeasureContexts[staffNumber];
        let measureContext: MeasureContext;

        if (currentMeasureContext !== undefined) {
            measureContext = currentMeasureContext.merge(context);
        } else {
            measureContext = new MeasureContext(context, staffNumber);
        }

        this.currentMeasureContexts[staffNumber] = measureContext;

        super.addItem(measureContext);
    }
}

class ScoreMeasure extends Measure {
    constructor(measure: Measure, inheritedContext?: MeasureContext[]) {
        super();

        if (inheritedContext !== undefined) {
            this.addContext(inheritedContext);
        }

        measure.items.forEach(it => this.addItem(it));
    }
}