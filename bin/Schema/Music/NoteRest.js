import { MusicalElement, ensure } from '../Music.js';
export class Mark extends MusicalElement {
    constructor(type, context) {
        super();
        this.context = context;
        this.type = ensureNoteRestType(type);
    }
}
function ensureNoteRestType(type) {
    return ensure(type, `note type ${type} is not valid`, (t) => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}
//# sourceMappingURL=NoteRest.js.map