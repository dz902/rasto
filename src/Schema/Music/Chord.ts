import { Maybe } from 'Utilities';
import { Note, FlagType, NoteType, Constituent } from 'Schema/Music';
import { StemDirection } from './types';
import { last } from '../../Utilities';

export class Chord extends Constituent {
    private chordNotes: ChordNote[] = [];
    private chordFlagType: Maybe<FlagType> = null;

    constructor(noteType: NoteType, notes: ReadonlyArray<Note>,
                private chordStemDirection: StemDirection) {
        super(noteType);

        for (let note of notes) {
            let chordNote = new ChordNote(note);

            this.chordNotes.push(chordNote);
        }

        this.sortNotes();
        this.computeDisplacementForNotes();
        this.computeNoteRelativeStaffPlaces();
        this.computeFlagType();
    }

    get notes(): ReadonlyArray<ChordNote> {
        return Object.freeze(this.chordNotes.concat([]));
    }

    get flagType(): Maybe<FlagType> {
        return this.chordFlagType;
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

    get stemDirection(): StemDirection {
        return this.chordStemDirection;
    }

    // API


    changeNoteType(newNoteType: NoteType): Constituent {
        super.changeNoteType(newNoteType);

        this.computeFlagType();

        return this;
    }

    changeStemDirection(stemDirection: StemDirection): this {
        this.chordStemDirection = stemDirection;
        this.computeDisplacementForNotes();

        return this;
    }

    // TASKS

    private computeFlagType(): this {
        let flag;
        let noFlagTypes = [NoteType.Whole, NoteType.Half, NoteType.Quarter];

        if(noFlagTypes.indexOf(this.noteType) !== -1) {
            flag = null;
        } else {
            flag = FlagType[NoteType[this.constituentNoteType] as keyof typeof FlagType]; // BLACK MAGIC #36316326
        }

        this.chordFlagType = flag;

        return this;
    }

    private sortNotes(): this {
        this.chordNotes.sort((a, b) => a.staffPlace - b.staffPlace);

        return this;
    }

    private computeNoteRelativeStaffPlaces(): void {
        this.chordNotes.forEach((note) => {
            note.relativeStaffPlace = note.staffPlace - this.bottomNote.staffPlace;
        });
    }

    private computeDisplacementForNotes(): this {
        let noteDisplacements: boolean[];

        let checkSeconds = (displacements: boolean[], note: ChordNote, i: number, notes: ReadonlyArray<ChordNote>) => {
            let prevNote = notes[i-1];
            let prevDisplacement = last(displacements);
            let isNotDisplacing = (prevDisplacement === undefined || prevDisplacement === false);
            let isSecond = (prevNote !== undefined && note.getIntervalTo(prevNote) === 2);

            displacements.push(isNotDisplacing && isSecond);

            return displacements;
        };

        if (this.stemDirection === StemDirection.Up) {
            noteDisplacements = this.notes.reduce(checkSeconds, []);
        } else {
            noteDisplacements = Array.from(this.notes).reverse().reduce(checkSeconds, []).reverse();
        }

        noteDisplacements.forEach((v, i) => this.chordNotes[i].displacement = v);

        return this;
    }
}

class ChordNote extends Note {
    // those really should be internal but lacking the mechanism
    // public getter + internal setter

    // ** @internal
    displacement: boolean = false;
    relativeStaffPlace: number = 0;

    constructor(note: Note) {
        super(note.pitchOctave,
              note.pitchStep,
              note.pitchAlter,
              note.duration);
    }
}