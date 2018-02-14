import { last, Maybe } from 'Utilities';
import { Note, NoteType, StaffPlaces, Constituent, Chord, Container, Context, LedgerLines, StaffItem, StemDirection, ChordNote } from 'Schema/Music';

export class Measure extends Container<StaffItem> {
    private currentStaffContexts: Context[] = [];

    addChord(chord: Chord, staffNumber: number = 0) {
        let contextNotSet = this.currentStaffContexts === null;

        if (contextNotSet) {
            throw new Error('chords cannot be added before setting a context');
        }

        let ledgerLines = this.computeLedgerLinesForChord(chord, this.currentStaffContexts!);
        let stemDirection = this.computeStemForChord(chord, this.currentStaffContexts!);

        super.addItem(new MeasureChord(chord, stemDirection, ledgerLines, 0));
    }

    addContext(context: Context, staffNumber: number = 0) {
        if (this.currentStaffContexts !== null) {
            this.currentStaffContexts = Context.merge(this.currentStaffContexts, context);
        } else {
            this.currentStaffContexts = context;
        }

        super.addItem(context);

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
    private _measureChordNotes: MeasureChordNote[] = [];
    private _stemDirection: StemDirection = StemDirection.Down;

    constructor(chord: Chord,
                stemDirection: StemDirection,
                private _ledgerLines: LedgerLines,
                private _staffNumber: number) {
        super(chord.type, chord.notes);

        this.changeStemDirection(stemDirection);
    }

    get notes(): ReadonlyArray<MeasureChordNote> {
        return Object.freeze(this._measureChordNotes);
    }

    get stemDirection(): StemDirection {
        return this._stemDirection;
    }

    get ledgerLines(): LedgerLines {
        return Object.freeze(this._ledgerLines);
    }

    get staffNumber(): number {
        return this._staffNumber;
    }

    // API

    changeStemDirection(stemDirection: StemDirection): MeasureChord {
        this._stemDirection = stemDirection;

        let displacements = this.computeDisplacementForNotes(super.notes, stemDirection);
        this._measureChordNotes = Array.from(super.notes).map((n, i) => new MeasureChordNote(n, displacements[i]));

        return this;
    }

    // PRIVATE

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