import { Glyph, NoteGlyph } from '../Glyphs.js';
import { Note } from '../../../Schema/Music.js';
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
            this.chord.notes.forEach((noteRest, i) => {
                if (noteRest instanceof Note) {
                    let note = noteRest;
                    let noteGlyph = new NoteGlyph(note);
                    // checkAdjacentNotes
                    let lastNote = this.chord.notes[i - 1] ? this.chord.notes[i - 1] : note;
                    let isNotThirds = note.getIntervalTo(this.chord.lowestNote) % 3 !== 0;
                    let isSecond = note.getIntervalTo(lastNote) === 2;
                    let isAdjacent = isNotThirds && isSecond;
                    if (isAdjacent) {
                        noteGlyph.translate(noteGlyph.width);
                    }
                    this.append(noteGlyph);
                }
            });
            console.log(this.rawElement);
        };
        this.draw();
    }
}
//# sourceMappingURL=ChordGlyph.js.map