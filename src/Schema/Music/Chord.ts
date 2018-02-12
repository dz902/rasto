import { Beam, Note, Mark } from 'Schema/Music';
import { Maybe } from 'Utilities/Maybe';
import { Constituent, FlagType, NoteType } from './Constituent';
import { LedgerLines } from './Common';

export class Chord extends Constituent {
    private chordNotes: ChordNote[] = [];
    private chordFlag: Maybe<FlagType> = null;
    private forcedDirection: Maybe<StemDirection> = null;

    constructor(notes: ReadonlyArray<Note>, noteType: NoteType) {
        super(noteType);

        let sortedNotes = this.sortNotes(Array.from(notes));

        for (let note of sortedNotes) {
            let chordNote = new ChordNote(note, this.noteType);

            chordNote.relativeStaffPlace = chordNote.staffPlace - this.lowestNote.staffPlace;

            this.chordNotes.push(chordNote);
        }

        this.chordFlag = this.computeFlag(this.noteType);
    }

    get notes(): ReadonlyArray<ChordNote> {
        return Object.freeze(this.chordNotes.concat([]));
    }

    get flag(): FlagType {
        return this.chordFlag;
    }

    get lowestNote(): Note {
        return this.chordNotes[0];
    }

    get highestNote(): Note {
        return this.chordNotes[this.chordNotes.length-1];
    }

    get spanStaffPlace(): number {
        return this.highestNote.staffPlace - this.lowestNote.staffPlace;
    }

    get direction(): StemDirection {
        if (this.forcedDirection !== null) {
            return this.forcedDirection;
        }

        let direction = StemDirection.Down;
        let chordHasOnlyOneNote = this.chordNotes.length === 1;

        if (chordHasOnlyOneNote) {
            if (this.lowestNote.staffPlace >= this.context.midStaffPlace) {
                direction = StemDirection.Down;
            } else {
                direction = StemDirection.Up;
            }
        } else {
            let topNoteDistance = Math.abs(this.highestNote.staffPlace - this.context.midStaffPlace);
            let bottomNoteDistance = Math.abs(this.lowestNote.staffPlace - this.context.midStaffPlace);

            if (topNoteDistance >= bottomNoteDistance) {
                direction = StemDirection.Down;
            } else {
                direction = StemDirection.Up;
            }
        }

        return direction;
    }

    // API

    forceDirection(direction: StemDirection): Chord {
        this.forcedDirection = direction;

        this.checkNoteDisplacement();

        return this;
    }

    changeNoteType(newNoteType: NoteType): Constituent {
        super.changeNoteType(newNoteType);

        this.chordNotes.map(n => new ChordNote(n, newNoteType));
        this.checkNoteDisplacement();

        return this;
    }

    // TASKS

    private computeStem(noteType: NoteType)

    private computeFlag(noteType: NoteType): Maybe<FlagType> {
        let flag;
        let noFlagTypes = [NoteType.Whole, NoteType.Half, NoteType.Quarter];

        if(noFlagTypes.indexOf(noteType) === -1) {
            flag = null;
        } else {
            flag = FlagType[NoteType[noteType] as keyof typeof FlagType]; // BLACK MAGIC #36316326
        }

        return flag;
    }

    private sortNotes(notes: Note[]): Note[] {
        return notes.sort((a, b) => a.staffPlace - b.staffPlace);
    }

    private checkNoteDisplacement(): void {
        let checkSeconds = (note: ChordNote, i: number, notes: ChordNote[]) => {
            let prevNote = notes[i - 1];
            let isNotDisplacing = (prevNote === undefined || !prevNote.needsDisplacement);
            let isSecond = (prevNote !== undefined && note.getIntervalTo(prevNote) === 2);

            note.needsDisplacement = isNotDisplacing && isSecond;
        };

        if (this.direction === StemDirection.Up) {
            this.chordNotes.forEach(checkSeconds);
        } else {
            this.chordNotes.concat([]).reverse().forEach(checkSeconds);
        }
    }

    private checkNoteRelativeStaffPlace(): void {
        this.chordNotes.forEach((note) => {
            note.relativeStaffPlace = note.getIntervalTo(this.lowestNote)-1;
        });
    }
}

export class ChordNote extends Note {
    // those really should be internal but lacking the mechanism
    // public getter + internal setter

    needsDisplacement: boolean = false;
    relativeStaffPlace: number = 0;

    constructor(note: Note, protected markType: NoteType) {
        super(note.pitchOctave,
              note.pitchStep,
              note.pitchAlter,
              note.duration,
              note.accidental);
    }

    get type(): NoteType {
        return this.markType;
    }
}