import { Maybe, Rest, MusicalElement, SimpleMap, Mark, Chord, maybe, maybeThen, ensureNumber, NumericValue } from '.';

export class Measure extends MusicalElement {
    readonly contexts: MeasureContext[] = [];
    readonly marks: Mark[] = [];

    get currentContext(): MeasureContext {
        return this.contexts[this.contexts.length - 1];
    }

    setContext(a: SimpleMap) {
        // ensureMeasureAttributes

        let context: MeasureContext = new MeasureContext(
            maybeThen(a.divisions, ensureNumber),
            maybeThen(a.timeBeats, ensureNumber),
            maybeThen(a.timeBeatType, ensureNumber),
            maybe(a.clefSign),
            maybeThen(a.clefLine, ensureNumber)
        );

        let prevContext = this.contexts[this.contexts.length-1];

        if (prevContext) {
            context = context.merge(prevContext);
        }

        this.contexts.push(context);
    }

    addMark(mark: Mark) {
        this.marks.push(mark);
    }
}

export class MeasureContext {
    constructor(readonly divisions: Maybe<number>,
                readonly timeBeats: Maybe<number>,
                readonly timeBeatType: Maybe<number>,
                readonly clefSign: Maybe<string>,
                readonly clefLine: Maybe<number>) {
    }

    get bottomStaffPlace(): number {
        let staffPlace = 0;

        switch (this.clefSign) {
            case 'F':
                staffPlace = 2 * 7 - 1 + 5;
                break;
            case 'G':
                staffPlace = 4 * 7 - 1 + 3; // 4 octaves + 1 third
                break;
        }

        return staffPlace;
    }

    get midStaffPlace(): number {
        return this.bottomStaffPlace + 4;
    }

    merge(oldContext: MeasureContext): MeasureContext {
        return new MeasureContext(
            or(this.divisions, oldContext.divisions),
            or(this.timeBeats, oldContext.timeBeats),
            or(this.timeBeatType, oldContext.timeBeatType),
            or(this.clefSign, oldContext.clefSign),
            or(this.clefLine, oldContext.clefLine)
        )
    }
}

function or<T>(a: T, b: T): T {
    if (a !== undefined) {
        return a;
    } else {
        return b;
    }
}