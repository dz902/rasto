import { Glyph, CharGlyph } from './index.js';
import { Note } from '../../../Schema/Music/index.js'

export class NoteHeadGlyph extends CharGlyph {
    private noteHeadWidth: number;

    constructor(private note: Note) {
        super(note.type, 'note-head', note.id);

        this.draw();
    }
}