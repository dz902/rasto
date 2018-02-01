import { Glyph, CharGlyph } from './index.js';
import { Note, MarkType } from '../../../Schema/Music/index.js'

export class NoteHeadGlyph extends CharGlyph {
    private noteHeadWidth: number;

    constructor(private note: Note) {
        super(note.type, 'note-head', note.id);

        this.draw();
    }

    get width(): number {
        return this.noteHeadWidth;
    }

    protected draw = (): void => {
        // calculateNoteHeadWidth

        let bbox = Glyph.meta.getGlyphBBox(this.type, this.note.type);

        this.noteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
    }
}