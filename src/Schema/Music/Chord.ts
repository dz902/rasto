import { Beam, Note, Mark, ensure } from './index.js';

export class Chord extends Mark {
    readonly notes: Note[] = [];
    readonly beams: Beam[] = [];

    get lowestNote(): Note {
        return this.notes[0];
    }

    get highestNote(): Note {
        return this.notes[this.notes.length-1];
    }

    get contextStaffPlace(): number {
        if (this.context.clefSign === 'G') {
            return 4*7-1 + 3; // 4 octaves + 1 third
        } else {
            return 0;
        }
    }

    get spanStaffPlace(): number {
        return this.highestNote.staffPlace - this.lowestNote.staffPlace;
    }

    addNote(note: Note): void {
        this.notes.push(note);
        this.notes.sort((a, b) => a.staffPlace - b.staffPlace);
    }

    addBeam(beam: Beam): void {
        this.beams.push(beam);
    }
}

export function ensureChord(chord: any): Chord {
    return ensure(chord, `${chord} is not a chord`,
                  (c: any | Chord): c is Chord => c instanceof Chord);
}