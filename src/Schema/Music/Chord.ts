import { Note, Mark, MarkType, ensure } from './index.js';

export class Chord extends Mark {
    readonly notes: Note[] = [];

    get lowestNote(): Note {
        return this.notes[0];
    }

    get highestNote(): Note {
        return this.notes[this.notes.length-1];
    }

    get baseStaffPlace(): number {
        if (this.context.clefSign === 'G') {
            return 4*7-1 + 3; // 4 octaves + 1 third
        } else {
            return 0;
        }
    }
}

export function ensureChord(chord: any): Chord {
    return ensure(chord, `${chord} is not a chord`,
                  (c: any | Chord): c is Chord => c instanceof Chord);
}