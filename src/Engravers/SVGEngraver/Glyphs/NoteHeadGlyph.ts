import { Glyph, CharGlyph } from '.';
import { ChordNote } from 'Schema/Music'

export class NoteHeadGlyph extends CharGlyph {
    constructor(private note: ChordNote) {
        super('note-head', note.type, note.id);
    }
}