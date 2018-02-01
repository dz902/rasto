import { NoteHeadGlyph, Glyph, StemGlyph } from './index.js';
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
            this.shiftFromStaffBottom(this.chord.lowestNote.staffPlace - this.chord.baseStaffPlace);
            // checkStem
            if (this.chord.type !== 'whole') {
                this.drawStem();
            }
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
        let offsetStaffPlace = intervalToLowestNote - 1; // intervals starts with unison = 1
        noteGlyph.shift(offsetStaffPlace);
        this.append(noteGlyph);
    }
    drawStem() {
        let stemGlyph = new StemGlyph(this.chord);
        this.append(stemGlyph);
        // checkFlag
    }
    drawFlag() {
    }
}
//# sourceMappingURL=ChordGlyph.js.map