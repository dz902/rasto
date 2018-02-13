import { last, Maybe } from 'Utilities';
import { StaffPlaces, Constituent, Chord, Container, Context, LedgerLines, StaffItem, StemDirection, ChordNote } from 'Schema/Music';
import { Note, NoteType } from './index';

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

        return stem;
    }
}

class MeasureChord extends Chord implements StaffItem {
    private measureChordNotes: MeasureChordNote[] = [];

    constructor(chord: Chord,
                private measureChordStem: StemDirection = StemDirection.Down,
                private measureChordLedgerLines: LedgerLines = { highest: null, lowest: null },
                private measureChordStaffNumber: number = 0) {
        super(chord.type, chord.notes);

        let displacements = this.computeDisplacementForNotes(chord.notes, measureChordStem);

        this.measureChordNotes = Array.from(chord.notes).map((n, i) => new MeasureChordNote(n, displacements[i]));
    }

    get notes(): ReadonlyArray<MeasureChordNote> {
        return Object.freeze(this.measureChordNotes);
    }

    get stem(): StemDirection {
        return this.measureChordStem;
    }

    get ledgerLines(): LedgerLines {
        return Object.freeze(this.measureChordLedgerLines);
    }

    get staffNumber(): number {
        return this.measureChordStaffNumber;
    }

    private computeDisplacementForNotes(notes: ReadonlyArray<ChordNote>, stem: StemDirection): boolean[] {
        let noteDisplacements: boolean[];

        let checkSeconds = (displacements: boolean[], note: ChordNote, i: number, notes: ReadonlyArray<ChordNote>) => {
            let prevNote = notes[i-1];
            let prevDisplacement = last(displacements);
            let isNotDisplacing = (prevDisplacement === undefined || prevDisplacement === false);
            let isSecond = (prevNote !== undefined && note.getIntervalTo(prevNote) === 2);

            displacements.push(isNotDisplacing && isSecond);

            return displacements;
        };

        if (stem === StemDirection.Up) {
            noteDisplacements = notes.reduce(checkSeconds, []);
        } else {
            noteDisplacements = Array.from(notes).reverse().reduce(checkSeconds, []).reverse();
        }

        return noteDisplacements;
    }
}

class MeasureChordNote extends ChordNote {
    constructor(note: Note,
                readonly displacement: boolean) {
        super(note);
    }
}