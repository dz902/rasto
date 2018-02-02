import { CharGlyph } from './index.js';
export class NoteHeadGlyph extends CharGlyph {
    constructor(note) {
        super('note-head', note.type, note.id);
        this.note = note;
    }
}
//# sourceMappingURL=NoteHeadGlyph.js.map