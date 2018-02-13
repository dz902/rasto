import { Maybe } from 'Utilities';
import { Note, FlagType, NoteType, Constituent } from 'Schema/Music';

export class Chord extends Constituent {
    private chordNotes: ChordNote[] = [];
    private chordFlag: Maybe<FlagType> = null;

    constructor(noteType: NoteType, notes: ReadonlyArray<Note>) {
        super(noteType);

        let sortedNotes = this.sortNotes(Array.from(notes));

        for (let note of sortedNotes) {
            let chordNote = new ChordNote(note);

            this.chordNotes.push(chordNote);
        }

        for (let chordNote of this.chordNotes) {
            chordNote.relativeStaffPlace = chordNote.staffPlace - this.bottomNote.staffPlace;
        }

        this.chordFlag = this.computeFlag(this.type);
    }

    get notes(): ReadonlyArray<ChordNote> {
        return Object.freeze(this.chordNotes.concat([]));
    }

    get flag(): Maybe<FlagType> {
        return this.chordFlag;
    }

    get bottomNote(): Note {
        return this.chordNotes[0];
    }

    get topNote(): Note {
        return this.chordNotes[this.chordNotes.length-1];
    }

    get spanStaffPlace(): number {
        return this.topNote.staffPlace - this.bottomNote.staffPlace;
    }

    // API


    changeNoteType(newNoteType: NoteType): Constituent {
        super.changeNoteType(newNoteType);

        return this;
    }

    // TASKS

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

    private checkNoteRelativeStaffPlace(): void {
        this.chordNotes.forEach((note) => {
            note.relativeStaffPlace = note.getIntervalTo(this.bottomNote)-1;
        });
    }
}

export class ChordNote extends Note {
    // those really should be internal but lacking the mechanism
    // public getter + internal setter

    // ** @internal
    relativeStaffPlace: number = 0;

    constructor(note: Note) {
        super(note.pitchOctave,
              note.pitchStep,
              note.pitchAlter,
              note.duration,
              note.accidental);
    }
}