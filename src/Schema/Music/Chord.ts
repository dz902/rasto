import { Beam, Note, Mark, MeasureContext, PitchStep, PitchOctave } from 'Schema/Music';
import { Maybe } from 'Utilities/Maybe';
import { MarkType } from './Mark';

export class Chord extends Mark {
    notes: ChordNote[] = [];
    beams: Beam[] = [];

    private forcedDirection: Maybe<StemDirection> = null;

    constructor(notes: Note[], markType: MarkType, context: MeasureContext) {
        super(markType, context);

        this.addNotes(notes);
        this.sortNotes();
        this.checkNoteDisplacement();
    }

    get lowestNote(): Note {
        return this.notes[0];
    }

    get highestNote(): Note {
        return this.notes[this.notes.length-1];
    }

    get spanStaffPlace(): number {
        return this.highestNote.staffPlace - this.lowestNote.staffPlace;
    }

    get direction(): StemDirection {
        if (this.forcedDirection !== null) {
            return this.forcedDirection;
        }

        let direction = StemDirection.Down;
        let chordHasOnlyOneNote = this.notes.length === 1;

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

    get needsStem(): boolean {
        return this.markType !== 'whole';
    }

    // API

    forceDirection(direction: StemDirection): Chord {
        this.forcedDirection = direction;

        this.checkNoteDisplacement();

        return this;
    }

    // TASKS

    private addNotes(notes: Note[]): void {
        if (notes.length === 0) {
            throw new Error('chord with no notes');
        }

        notes.forEach((note) => {
            let chordNote = new ChordNote(this.type, note);

            this.notes.push(chordNote);
        });
    }

    private sortNotes(): void {
        this.notes.sort((a, b) => a.staffPlace - b.staffPlace);
    }

    private checkNoteDisplacement(): void {
        let checkSeconds = (note: ChordNote, i: number, notes: ChordNote[]) => {
            let prevNote = notes[i - 1];
            let isNotDisplacing = (prevNote === undefined || !prevNote.needsDisplacement);
            let isSecond = (prevNote !== undefined && note.getIntervalTo(prevNote) === 2);

            note.needsDisplacement = isNotDisplacing && isSecond;
        };

        if (this.direction === StemDirection.Up) {
            this.notes.forEach(checkSeconds);
        } else {
            this.notes.concat([]).reverse().forEach(checkSeconds);
        }
    }
}

export class ChordNote extends Note {
    needsDisplacement: boolean = false;

    constructor(protected markType: MarkType, note: Note) {
        super(note.pitchOctave,
              note.pitchStep,
              note.pitchAlter,
              note.duration);
    }

    get type(): MarkType {
        return this.markType;
    }
}

export enum StemDirection {
    Up = 'up',
    Down = 'down'
}