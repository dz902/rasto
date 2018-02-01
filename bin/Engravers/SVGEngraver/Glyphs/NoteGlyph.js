import { Glyph, CharGlyph } from './index.js';
export class NoteHeadGlyph extends CharGlyph {
    constructor(note) {
        super(note.type, 'note-head', note.id);
        this.note = note;
        this.draw = () => {
            // calculateNoteHeadWidth
            let bbox = Glyph.meta.getGlyphBBox(this.type, this.note.type);
            this.noteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
        };
        this.draw();
    }
    get width() {
        return this.noteHeadWidth;
    }
}
//# sourceMappingURL=NoteGlyph.js.map