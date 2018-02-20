import { NoteType } from 'Schema/Music';


export abstract class Mark {
    private markId: number;
    private markNoteType: NoteType;

    constructor(noteType: NoteType) {
        this.markId = uniq();
        this.markNoteType = noteType;
    }

    get id(): number {
        return this.markId;
    }

    get noteType(): NoteType {
        return this.markNoteType;
    }

    changeNoteType(newNoteType: NoteType): Mark {
        this.markNoteType = newNoteType;

        return this;
    }
}

function uniq(): number {
    let randomNumber = window.performance ? window.performance.now() : Math.random();
    return Number(String(randomNumber).split('.').join(''));
}