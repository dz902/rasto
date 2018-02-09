import { Beam, Note, Mark, ensure } from '.';

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
        let staffPlace = 0;

        switch (this.context.clefSign) {
            case 'F':
                staffPlace = 2*7-1 + 5;
                break;
            case 'G':
                staffPlace = 4*7-1 + 3; // 4 octaves + 1 third
                break;
        }

        return staffPlace;
    }

    get spanStaffPlace(): number {
        return this.highestNote.staffPlace - this.lowestNote.staffPlace;
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