import { NoteType } from 'Schema/Music';

export abstract class Mark {
    private markNoteType: NoteType;

    constructor(noteType: NoteType) {
        this.markNoteType = noteType;
    }

    get noteType(): NoteType {
        return this.markNoteType;
    }

    changeNoteType(newNoteType: NoteType): Mark {
        this.markNoteType = newNoteType;

        return this;
    }
}
