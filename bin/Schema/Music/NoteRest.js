import { MusicalElement, ensure } from '../Music.js';
export class NoteRest extends MusicalElement {
    constructor(type) {
        super();
        this.type = ensureNoteRestType(type);
    }
}
function ensureNoteRestType(type) {
    return ensure(type, `note type ${type} is not valid`, (t) => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}
//# sourceMappingURL=NoteRest.js.map