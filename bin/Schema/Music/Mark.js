import { MusicalElement, ensure } from './index.js';
export class Mark extends MusicalElement {
    constructor(type, context) {
        super();
        this.context = context;
        this.type = ensureMarkType(type);
    }
}
export function ensureMarkType(type) {
    return ensure(type, `note type ${type} is not valid`, (t) => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}
//# sourceMappingURL=Mark.js.map