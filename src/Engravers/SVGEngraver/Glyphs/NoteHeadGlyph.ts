import { Glyph, CharGlyph } from './index.js';
import { Note } from '../../../Schema/Music/index.js'

export class NoteHeadGlyph extends CharGlyph {
    constructor(private note: Note) {
        super('note-head', note.type, note.id);
    }
}