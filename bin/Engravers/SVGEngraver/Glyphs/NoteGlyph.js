import { Glyph, CharGlyph } from '../Glyphs.js';
export class NoteGlyph extends Glyph {
    constructor(note) {
        super('note', note.id);
        this.note = note;
        this.draw = () => {
            this.drawNoteHead();
        };
        this.draw();
    }
    drawNoteHead() {
        let noteheadGlyphNames = {
            'whole': 'noteWhole',
            'half': 'noteheadHalf',
            'quarter': 'noteheadBlack',
            'eighth': 'noteheadBlack',
            '16th': 'noteheadBlack',
            '32nd': 'noteheadBlack'
        };
        let noteheadGlyphName = noteheadGlyphNames[this.note.type];
        let glyphNameNotFound = (!noteheadGlyphName);
        if (glyphNameNotFound) {
            throw new Error('unknown note type');
        }
        let textGlyph = new NoteHeadGlyph(this.note.id, noteheadGlyphName);
        this.append(textGlyph);
    }
}
class NoteHeadGlyph extends CharGlyph {
    constructor(noteId, charName) {
        super('note-head', noteId, charName);
        this.charName = charName;
    }
}
//# sourceMappingURL=NoteGlyph.js.map