import { NoteRest, ensure } from '../Music.js';
export class Chord extends NoteRest {
    constructor() {
        super(...arguments);
        this.notes = [];
    }
    get lowestNote() {
        return this.notes[0];
    }
    get highestNote() {
        return this.notes[this.notes.length];
    }
}
export function ensureChord(chord) {
    return ensure(chord, `${chord} is not a chord`, (c) => c instanceof Chord);
}
//# sourceMappingURL=Chord.js.map