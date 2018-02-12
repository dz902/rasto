import { Maybe } from 'Utilities';
import { StaffPlaces, Constituent, Chord, Container, Context, LedgerLines, StaffItem, StemDirection, ChordNote } from 'Schema/Music';

export class Measure extends Container<StaffItem> {
    private currentContext: Maybe<Context> = null;

    addConstituentOrContext(constituentOrContext: Constituent | Context) {
        let item: StaffItem;

        if (constituentOrContext instanceof Chord) {
            let contextNotSet = this.currentContext === null;

            if (contextNotSet) {
                throw new Error('chords cannot be added before setting a context');
            }

            let chord = constituentOrContext;
            let ledgerLines = this.computeLedgerLinesForChord(chord, this.currentContext!);
            let stem = this.computeStemForChord(chord, this.currentContext!);

            item = new MeasureChord(chord, stem, ledgerLines, 0);
        } else if (constituentOrContext instanceof Context) {
            item = constituentOrContext;

            if (this.currentContext !== null) {
                this.currentContext = Context.merge(this.currentContext, item as Context);
            } else {
                this.currentContext = item as Context;
            }
        } else {
            throw new Error();
        }

        super.addItem(item);

        return this;
    }

    get chords(): ReadonlyArray<MeasureChord> {
        return Object.freeze(this.items.filter(it => it instanceof MeasureChord)) as ReadonlyArray<MeasureChord>;
    }

    // PRIVATE

    private computeLedgerLinesForChord(chord: Chord, context: Context): LedgerLines {
        let ledgerLines: LedgerLines = { highest: null, lowest: null };
        let topNoteHigherThanSpaceSix = chord.topNote.staffPlace > (context.topStaffPlace + 1);

        if (topNoteHigherThanSpaceSix) {
            ledgerLines.highest = StaffPlaces.staffSpan + Math.floor((chord.topNote.staffPlace - context.topStaffPlace) / 2) * StaffPlaces.third;
        }

        let bottomNoteLowerThanSpaceMinusOne = chord.bottomNote.staffPlace < context.bottomStaffPlace - 1;

        if (bottomNoteLowerThanSpaceMinusOne) {
            ledgerLines.lowest = 0 - Math.floor((context.bottomStaffPlace - chord.bottomNote.staffPlace) / 2) * StaffPlaces.third;
        }

        return ledgerLines;
    }

    private computeStemForChord(chord: Chord, context: Context): StemDirection {
        let stem = StemDirection.Down;
        let topDistance = Math.abs(chord.topNote.staffPlace - context.midStaffPlace);
        let bottomDistance = Math.abs(chord.bottomNote.staffPlace - context.midStaffPlace);

        if (topDistance >= bottomDistance) {
            stem = StemDirection.Down;
        } else {
            stem = StemDirection.Up;
        }
console.log(chord.topNote.staffPlace, chord.bottomNote.staffPlace, context.midStaffPlace);
        return stem;
    }
}

class MeasureChord extends Chord implements StaffItem {
    constructor(chord: Chord,
                private chordStem: StemDirection = StemDirection.Down,
                private chordLedgerLines: LedgerLines = { highest: null, lowest: null },
                private chordStaffNumber: number = 0) {
        super(chord.type, chord.notes);

        let displacements = this.computeDisplacementForNotes(chord.notes);

        chord.notes.forEach((n, i) => n.displacement = displacements[i]);
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

    private computeDisplacementForNotes(notes: ReadonlyArray<ChordNote>): boolean[] {
        let noteDisplacements: boolean[];

        let checkSeconds = (note: ChordNote, i: number, notes: ReadonlyArray<ChordNote>) => {
            let prevNote = notes[i - 1];
            let isNotDisplacing = (prevNote === undefined || !prevNote.displacement);
            let isSecond = (prevNote !== undefined && note.getIntervalTo(prevNote) === 2);

            return isNotDisplacing && isSecond;
        };

        if (this.stem === StemDirection.Up) {
            noteDisplacements = notes.map(checkSeconds);
        } else {
            noteDisplacements = notes.concat([]).reverse().map(checkSeconds).reverse();
        }

        return noteDisplacements;
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