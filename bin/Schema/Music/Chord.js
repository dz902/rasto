import { Mark, ensure } from './index.js';
export class Chord extends Mark {
    constructor() {
        super(...arguments);
        this.notes = [];
    }
    get lowestNote() {
        return this.notes[0];
    }
    get highestNote() {
        return this.notes[this.notes.length - 1];
    }
    get baseStaffPlace() {
        if (this.context.clefSign === 'G') {
            return 4 * 7 - 1 + 3; // 4 octaves + 1 third
        }
        else {
            return 0;
        }
    }
}
export function ensureChord(chord) {
    return ensure(chord, `${chord} is not a chord`, (c) => c instanceof Chord);
}
//# sourceMappingURL=Chord.js.map