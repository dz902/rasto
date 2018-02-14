import { NoteType } from 'Schema/Music';

export abstract class Constituent {
    protected constituentNoteType: NoteType;

    constructor(noteType: NoteType) {
        this.constituentNoteType = noteType;
    }

    get noteType(): NoteType {
        return this.constituentNoteType;
    }

    changeNoteType(newNoteType: NoteType): Constituent {
        this.constituentNoteType = newNoteType;

        return this;
    }
}
