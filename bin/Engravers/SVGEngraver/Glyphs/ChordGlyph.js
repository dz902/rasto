import { NoteHeadGlyph, Glyph } from './index.js';
export class ChordGlyph extends Glyph {
    constructor(chord) {
        super('chord', chord.id);
        this.chord = chord;
        this.draw = () => {
            // ensureNonEmptyChord
            let chordHasNoNotes = this.chord.notes.length === 0;
            if (chordHasNoNotes) {
                throw new Error('empty chord');
            }
            // drawNoteRest
            this.chord.notes.forEach((note, i) => {
                let prevNote = this.chord.notes[i - 1] ? this.chord.notes[i - 1] : note;
                this.drawNote(note, prevNote);
            });
            this.shift(this.chord.lowestNote.staffPlace - this.baseStaffPlace);
        };
        this.draw();
    }
    drawNote(note, prevNote) {
        let noteGlyph = new NoteHeadGlyph(note);
        // checkAdjacentNotes
        let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
        let isNotThirds = intervalToLowestNote % 3 !== 0; // thirds always stay in place
        let isSecond = note.getIntervalTo(prevNote) === 2;
        let isAdjacent = isNotThirds && isSecond;
        if (isAdjacent) {
            noteGlyph.translate(noteGlyph.width);
        }
        // moveNoteToStaffPlace
        let offsetStaffPlace = intervalToLowestNote;
        noteGlyph.shift(offsetStaffPlace - 1);
        this.append(noteGlyph);
    }
    get baseStaffPlace() {
        if (this.chord.context.clefSign === 'G') {
            return 3 * 8 + 2; // 3 octaves + 1 third
        }
        else {
            return 0;
        }
    }
}
//# sourceMappingURL=ChordGlyph.js.map