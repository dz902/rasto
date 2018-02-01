import { CharGlyph } from './index.js';
export class NoteHeadGlyph extends CharGlyph {
    constructor(note) {
        super(note.type, 'note-head', note.id);
        this.note = note;
        this.draw();
    }
}
//# sourceMappingURL=NoteHeadGlyph.js.map