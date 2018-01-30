import { MusicalElement, ensure } from '../Music.js';

export class NoteRest extends MusicalElement {
    readonly type: NoteRestType;

    constructor(type: string) {
        super();

        this.type = ensureNoteRestType(type);
    }
}

type NoteRestType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd';

function ensureNoteRestType(type: string): NoteRestType {
    return ensure(type, `note type ${type} is not valid`,
                  (t: string): t is NoteRestType => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}