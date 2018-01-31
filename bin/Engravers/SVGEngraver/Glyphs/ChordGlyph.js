import { MarkGlyph, NoteGlyph } from '../Glyphs.js';
const STEP_NAMES = 'CDEFGAB';
export class ChordGlyph extends MarkGlyph {
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
            console.log(this.chord.lowestNote.staffPlace - this.baseStaffPlace);
            this.shiftStaffPlace(this.chord.lowestNote.staffPlace - this.baseStaffPlace);
        };
        this.draw();
    }
    drawNote(note, prevNote) {
        let noteGlyph = new NoteGlyph(note);
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
        noteGlyph.shiftStaffPlace(offsetStaffPlace);
        this.append(noteGlyph);
    }
    get baseStaffPlace() {
        if (this.chord.context.clefSign === 'G') {
            return 4 * 7 + 3;
        }
        else {
            return 0;
        }
    }
}
//# sourceMappingURL=ChordGlyph.js.map