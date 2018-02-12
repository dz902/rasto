import { NoteType } from 'Schema/Music';

export abstract class Constituent {
    protected _noteType: NoteType;

    constructor(noteType: NoteType) {
        this._noteType = noteType;
    }

    get type(): NoteType {
        return this._noteType;
    }

    changeNoteType(newNoteType: NoteType): Constituent {
        this._noteType = newNoteType;

        return this;
    }
}
