import { NoteHeadGlyph, Glyph, StemFlagGlyph } from './index.js';
import { Chord, Note } from '../../../Schema/Music/index.js';

export class ChordGlyph extends Glyph {
    private chordHasAdjacentNotes: boolean = false;
    private noteHeadGlyph: NoteHeadGlyph;

    constructor(private chord: Chord) {
        super('chord', chord.id);

        // ensureNonEmptyChord

        let chordHasNoNotes: boolean = this.chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }

        this.draw();
    }

    protected draw = (): void => {
        // drawNotes

        this.chord.notes.forEach((note: Note, i: number) => {
            let prevNote = this.chord.notes[i - 1] ? this.chord.notes[i - 1] : note;

            this.drawNote(note, prevNote);
        });

        this.shiftFromStaffBottom((this.chord.lowestNote.staffPlace - this.chord.contextStaffPlace)/2);
        this.offsetNoteClusters();
        this.checkStemFlag();
    };

    private drawNote(note: Note, prevNote: Note): void {
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

        let offsetStaffPlace = intervalToLowestNote - 1;  // intervals starts with unison = 1

        noteHeadGlyph.translate(undefined, -offsetStaffPlace/2);

        this.append(noteHeadGlyph);
    }

    private offsetNoteClusters(): void {
        if (this.chordHasAdjacentNotes) {
            this.translate(-this.noteHeadGlyph.width);
        }
    }

    private checkStemFlag(): void {
        if (this.chord.type === 'whole') {
            return;
        }

        let stemFlagGlyph = new StemFlagGlyph(this.chord);

        this.append(stemFlagGlyph);
    }
}