import { Mark, ensure } from './index.js';
export class Chord extends Mark {
    constructor() {
        super(...arguments);
        this.notes = [];
        this.beams = [];
    }
    get lowestNote() {
        return this.notes[0];
    }
    get highestNote() {
        return this.notes[this.notes.length - 1];
    }
    get contextStaffPlace() {
        if (this.context.clefSign === 'G') {
            return 4 * 7 - 1 + 3; // 4 octaves + 1 third
        }
        else {
            return 0;
        }
    }
    get spanStaffPlace() {
        return this.highestNote.staffPlace - this.lowestNote.staffPlace;
    }
    addNote(note) {
        this.notes.push(note);
        this.notes.sort((a, b) => a.staffPlace - b.staffPlace);
    }
    addBeam(beam) {
        this.beams.push(beam);
    }
}
export function ensureChord(chord) {
    return ensure(chord, `${chord} is not a chord`, (c) => c instanceof Chord);
}
//# sourceMappingURL=Chord.js.map