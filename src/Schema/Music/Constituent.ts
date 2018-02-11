import { ensure } from './Common';
import { Note } from './Note';

export abstract class Constituent {
    protected _noteType: NoteType;

    constructor(noteType: NoteType) {
        this._noteType = noteType;
    }

    get noteType(): NoteType {
        return this._noteType;
    }

    changeNoteType(newNoteType: NoteType): Constituent {
        this._noteType = newNoteType;

        return this;
    }
}

export const enum NoteType {
    Whole = 1,
    Half = 2,
    Quarter = 4,
    Eighth = 8,
    N16th = 16,
    N32nd = 32,
    N64th = 64,
    N128th = 128
}

export function ensureNoteType(noteType: number): NoteType {
    let markTypeList: number[] = [
        NoteType.Whole,
        NoteType.Half,
        NoteType.Quarter,
        NoteType.Eighth,
        NoteType.N16th,
        NoteType.N32nd,
        NoteType.N64th,
        NoteType.N128th
    ];

    return ensure(noteType, `mark type ${noteType} is not valid`,
                  (t: number): t is NoteType => markTypeList.indexOf(t) !== -1);
}