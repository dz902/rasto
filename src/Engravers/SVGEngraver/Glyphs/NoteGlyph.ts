import { Glyph, CharGlyph } from '../Glyphs.js';
import { Note } from '../../../Schema/Music.js'

export class NoteGlyph extends Glyph {
    private noteHeadWidth: number;

    constructor(private note: Note) {
        super('note', note.id);

        this.draw();
    }

    get width(): number {
        return this.noteHeadWidth;
    }

    draw = (): void => {
        this.drawNoteHead();
    };

    private drawNoteHead(): void {
        // verifyNoteHeadType

        let noteheadGlyphNames: { [k: string]: string } = {
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
    constructor(noteId: string, protected charName: string) {
        super('note-head', noteId, charName);
    }
}