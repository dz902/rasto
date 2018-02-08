import { Glyph, CharGlyph } from '.';
import { Note } from '../../../Schema/Music'

export class NoteHeadGlyph extends CharGlyph {
    constructor(private note: Note) {
        super('note-head', note.type, note.id);
    }
}