import { NoteHeadGlyph, Glyph, StemGlyph } from './index.js';
import { Chord, Note } from '../../../Schema/Music/index.js';

export class ChordGlyph extends Glyph {
    constructor(private chord: Chord) {
        super('chord', chord.id);

        this.draw();
    }

    protected draw = (): void => {
        // ensureNonEmptyChord

        let chordHasNoNotes: boolean = this.chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }

        // drawNoteRest

        this.chord.notes.forEach((note: Note, i: number) => {
            let prevNote = this.chord.notes[i - 1] ? this.chord.notes[i - 1] : note;

            this.drawNote(note, prevNote);
        });

        this.shiftFromStaffBottom(this.chord.lowestNote.staffPlace - this.chord.baseStaffPlace);

        // checkStem

        if (this.chord.type !== 'whole') {
            this.drawStem();
        }
    };

    private drawNote(note: Note, prevNote: Note): void {
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

        let offsetStaffPlace = intervalToLowestNote - 1;  // intervals starts with unison = 1

        noteGlyph.shift(offsetStaffPlace);

        this.append(noteGlyph);
    }

    private drawStem(): void {
        let stemGlyph = new StemGlyph(this.chord);

        this.append(stemGlyph);

        // checkFlag
    }

    private drawFlag(): void {

    }
}