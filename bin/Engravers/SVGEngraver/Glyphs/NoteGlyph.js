import { Glyph, MarkGlyph, CharGlyph } from './index.js';
export class NoteGlyph extends MarkGlyph {
    constructor(note) {
        super('note', note.id);
        this.note = note;
        this.draw = () => {
            this.drawNoteHead();
        };
        this.draw();
    }
    get width() {
        return this.noteHeadWidth;
    }
    drawNoteHead() {
        // verifyNoteHeadType
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
        // getNoteHeadWidth
        let bbox = Glyph.meta.glyphBBoxes[noteheadGlyphName];
        this.noteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
    }
}
class NoteHeadGlyph extends CharGlyph {
    constructor(noteId, charName) {
        super('note-head', charName, noteId);
        this.charName = charName;
    }
}
class StemGlyph extends Glyph {
    constructor(noteId, length) {
        super('stem', noteId);
        this.draw = () => {
        };
    }
}
//# sourceMappingURL=NoteGlyph.js.map