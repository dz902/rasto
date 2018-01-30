import { Note, Rest, NoteRest, ensureNote, MusicalElement, ensure } from '../Music.js';

export class Chord extends NoteRest {
    readonly notes: Note[] = [];

    get lowestNote(): Note {
        return this.notes[0];
    }

    get highestNote(): Note {
        return this.notes[this.notes.length];
    }
}

export function ensureChord(chord: any): Chord {
    return ensure(chord, `${chord} is not a chord`,
                  (c: any | Chord): c is Chord => c instanceof Chord);
}

export type Mark = Chord | Rest;