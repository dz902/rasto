import { MusicalElement, MeasureAttributes, ensure } from './index.js';

export class Mark extends MusicalElement {
    readonly type: MarkType;

    constructor(type: string,
                readonly context: MeasureAttributes) {
        super();

        this.type = ensureMarkType(type);
    }
}

export type MarkType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd';

export function ensureMarkType(type: string): MarkType {
    return ensure(type, `note type ${type} is not valid`,
                  (t: string): t is MarkType => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd'].indexOf(t) !== -1);
}