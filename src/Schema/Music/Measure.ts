import { Rest, MusicalElement, SimpleMap, Mark, Chord, maybe, maybeThen, ensureNumber, NumericValue } from '.';
import { StaffPlace } from './Common';
import { Container } from './Container';
import { Maybe } from '../../Utilities';
import { Context } from './Context';

export class Measure extends Container<Chord | Context> {
    protected content: (Chord | Context)[] = [];

    constructor(initialContext: Context) {
        super();

        this.take(initialContext);
    }

    get chords(): ReadonlyArray<Chord | Context> {
        return Object.freeze(this.content.concat([]));
    }

    take(chordOrContext: Chord | Context) {
        super.take(chordOrContext);

        return this;
    }
}
//
// export class Measure extends MusicalElement {
//     private contexts: MeasureContext[] = [];
//     readonly marks: Mark[] = [];
//
//     get currentContext(): Maybe<MeasureContext> {
//         return this.contexts[this.contexts.length - 1];
//     }
//
//     setContext(a: SimpleMap) {
//         // ensureMeasureAttributes
//
//         let context: MeasureContext = new MeasureContext(
//             maybeThen(a.divisions, ensureNumber),
//             maybeThen(a.timeBeats, ensureNumber),
//             maybeThen(a.timeBeatType, ensureNumber),
//             maybe(a.clefSign),
//             maybeThen(a.clefLine, ensureNumber)
//         );
//
//         let prevContext = this.contexts[this.contexts.length-1];
//
//         if (prevContext) {
//             context = context.merge(prevContext);
//         }
//
//         this.contexts.push(context);
//     }
//
//     addMark(mark: Mark) {
//         this.marks.push(mark);
//     }
// }

export class MeasureContext implements SimpleMap {
    constructor(readonly divisions: Maybe<number>,
                readonly timeBeats: Maybe<number>,
                readonly timeBeatType: Maybe<number>,
                readonly clefSign: Maybe<string>,
                readonly clefLine: Maybe<number>) {
    }

    get lowestStaffPlace(): number {
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

    get highestStaffPlace(): number {
        return this.lowestStaffPlace + (StaffPlace.space*4);
    }

    get midStaffPlace(): number {
        return this.lowestStaffPlace + (StaffPlace.space*2);
    }

    merge(oldContext: MeasureContext): MeasureContext {
        return new MeasureContext(
            this.divisions || oldContext.divisions,
            this.timeBeats || oldContext.timeBeats,
            this.timeBeatType || oldContext.timeBeatType,
            this.clefSign || oldContext.clefSign,
            this.clefLine || oldContext.clefLine
        )
    }

    sameAs(otherContext: MeasureContext): boolean {
        let thisContext: MeasureContext = this;
        let k: keyof MeasureContext;

        for (k in thisContext) {
            if (thisContext[k] !== otherContext[k]) {
                return false;
            }
        }

        return true;
    }
}