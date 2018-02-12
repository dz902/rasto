import { Rest, MusicalElement, SimpleMap, Mark, Chord, maybe, maybeThen, ensureNumber, NumericValue } from '.';
import { Container } from './Container';
import { Context } from './Context';
import { Constituent, FlagType, NoteType } from './Constituent';
import { LedgerLines } from './Common';
import { Maybe } from '../../Utilities';

type MeasureItem = Constituent | Context;

export class Measure implements Container<MeasureItem> {
    protected content: (Constituent | Context)[] = [];
    private currentContext: Context;

    constructor(initialContext: Context) {
        this.currentContext = initialContext;

        this.addItem(initialContext);
    }

    get items() {
        return Object.freeze(this.content.concat([]));
    }

    addItem(constituentOrContext: MeasureItem) {
        let item: MeasureItem;

        if (constituentOrContext instanceof Chord) {
            let chord = constituentOrContext;
            let ledgerLines = this.computeLedgerLinesForChord(chord, this.currentContext);

            item = new MeasureChord(chord, StemDirection.Down, ledgerLines, 0);
        } else if (constituentOrContext instanceof Context) {
            item = constituentOrContext;

            this.currentContext = item;
        } else {
            item = constituentOrContext;
        }

        this.content.push(item);

        return this;
    }

    // PRIVATE

    private computeLedgerLinesForChord(chord: Chord, context: Context): LedgerLines {
        let ledgerLines: LedgerLines = { highest: null, lowest: null };
        let topNoteHigherThanSpaceSix = chord.highestNote.staffPlace > context.topStaffPlace + 1;

        if (topNoteHigherThanSpaceSix) {
            ledgerLines.highest = (chord.highestNote.staffPlace - context.topStaffPlace) / 2;
        }

        let bottomNoteLowerThanSpaceMinusOne = chord.lowestNote.staffPlace < context.bottomStaffPlace - 1;

        if (bottomNoteLowerThanSpaceMinusOne) {
            ledgerLines.lowest = (chord.lowestNote.staffPlace - context.topStaffPlace) / 2;
        }

        return ledgerLines;
    }

    private computeStemForChord(chord: Chord, context: Context): Maybe<StemDirection> {
        let stem = null;
        let stemNeeded = (chord.noteType !== NoteType.Whole);

        if (stemNeeded) {
            let topDistance = Math.abs(chord.highestNote.staffPlace - context.midStaffPlace);
            let bottomDistance = Math.abs(chord.lowestNote.staffPlace - context.midStaffPlace);

            if (topDistance >= bottomDistance) {
                stem = StemDirection.Down;
            } else {
                stem = StemDirection.Up;
            }
        }

        return stem;
    }
}

class MeasureChord extends Chord {
    constructor(chord: Chord,
                private chordStem: StemDirection = StemDirection.Down,
                private chordLedgerLines: LedgerLines = { highest: null, lowest: null },
                private chordStaffNumber: number = 0) {
        super(chord.notes, chord.noteType);
    }

    get stem(): StemDirection {
        return this.chordStem;
    }

    get ledgerLines(): LedgerLines {
        return Object.freeze(this.chordLedgerLines);
    }

    get staffNumber(): number {
        return this.chordStaffNumber;
    }
}

export enum StemDirection {
    Up = 'up',
    Down = 'down'
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

// export class MeasureContext implements SimpleMap {
//     constructor(readonly divisions: Maybe<number>,
//                 readonly timeBeats: Maybe<number>,
//                 readonly timeBeatType: Maybe<number>,
//                 readonly clefSign: Maybe<string>,
//                 readonly clefLine: Maybe<number>) {
//     }
//
//     get lowestStaffPlace(): number {
//         let staffPlace = 0;
//
//         switch (this.clefSign) {
//             case 'F':
//                 staffPlace = 2 * 7 - 1 + 5;
//                 break;
//             case 'G':
//                 staffPlace = 4 * 7 - 1 + 3; // 4 octaves + 1 third
//                 break;
//         }
//
//         return staffPlace;
//     }
//
//     get highestStaffPlace(): number {
//         return this.lowestStaffPlace + (StaffPlace.space*4);
//     }
//
//     get midStaffPlace(): number {
//         return this.lowestStaffPlace + (StaffPlace.space*2);
//     }
//
//     merge(oldContext: MeasureContext): MeasureContext {
//         return new MeasureContext(
//             this.divisions || oldContext.divisions,
//             this.timeBeats || oldContext.timeBeats,
//             this.timeBeatType || oldContext.timeBeatType,
//             this.clefSign || oldContext.clefSign,
//             this.clefLine || oldContext.clefLine
//         )
//     }
//
//     sameAs(otherContext: MeasureContext): boolean {
//         let thisContext: MeasureContext = this;
//         let k: keyof MeasureContext;
//
//         for (k in thisContext) {
//             if (thisContext[k] !== otherContext[k]) {
//                 return false;
//             }
//         }
//
//         return true;
//     }
// }