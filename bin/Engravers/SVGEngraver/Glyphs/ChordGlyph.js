import { NoteHeadGlyph, Glyph, StemFlagGlyph } from './index.js';
export class ChordGlyph extends Glyph {
    constructor(chord) {
        super('chord', chord.id);
        this.chord = chord;
        this.chordHasAdjacentNotes = false;
        this.draw = () => {
            // drawNotes
            this.chord.notes.forEach((note, i) => {
                let prevNote = this.chord.notes[i - 1] ? this.chord.notes[i - 1] : note;
                this.drawNote(note, prevNote);
            });
            this.shiftFromStaffBottom((this.chord.lowestNote.staffPlace - this.chord.contextStaffPlace) / 2);
            this.offsetNoteClusters();
            this.checkStemFlag();
        };
        // ensureNonEmptyChord
        let chordHasNoNotes = this.chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }
        this.draw();
    }
    drawNote(note, prevNote) {
        let noteHeadGlyph = new NoteHeadGlyph(note);
        // checkAdjacentNotes
        let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
        let isNotThirds = intervalToLowestNote % 3 !== 0; // thirds always stay in place
        let isSecond = note.getIntervalTo(prevNote) === 2;
        let isAdjacent = isNotThirds && isSecond;
        if (isAdjacent) {
            this.chordHasAdjacentNotes = true;
            noteHeadGlyph.translate(noteHeadGlyph.width);
        }
        this.noteHeadGlyph = noteHeadGlyph;
        // moveNoteToStaffPlace
        let offsetStaffPlace = intervalToLowestNote - 1; // intervals starts with unison = 1
        noteHeadGlyph.translate(undefined, -offsetStaffPlace / 2);
        this.append(noteHeadGlyph);
    }
    offsetNoteClusters() {
        if (this.chordHasAdjacentNotes) {
            this.translate(-this.noteHeadGlyph.width);
        }
    }
    checkStemFlag() {
        if (this.chord.type === 'whole') {
            return;
        }
        let stemFlagGlyph = new StemFlagGlyph(this.chord);
        this.append(stemFlagGlyph);
    }
}
//# sourceMappingURL=ChordGlyph.js.map