import { Beam, Note, Mark, Measure, ensure } from 'Schema/Music';
import { MeasureContext } from './Measure';
import { ensureMarkType } from './Mark';

export class Chord extends Mark {
    notes: Note[] = [];
    beams: Beam[] = [];

    private forcedDirection: StemDirection;

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
        if (this.forcedDirection !== undefined) {
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

    set direction(direction: StemDirection) {
        this.forcedDirection = direction;
    }

    addNote(note: Note): Chord {
        this.notes.push(note);
        this.notes.sort((a, b) => a.staffPlace - b.staffPlace);

        return this;
    }
}

export function ensureChord(chord: any): Chord {
    return ensure(chord, `${chord} is not a chord`,
                  (c: any | Chord): c is Chord => c instanceof Chord);
}

export enum StemDirection {
    Up = 'up',
    Down = 'down'
}