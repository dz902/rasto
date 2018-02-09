import { MusicalElement, MeasureContext, ensure } from '.';

export class Mark extends MusicalElement {
    readonly type: MarkType;

    constructor(type: string,
                readonly context: MeasureContext) {
        super();

        this.type = ensureMarkType(type);
    }
}

export type MarkType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd';

export function ensureMarkType(type: string): MarkType {
    return ensure(type, `note type ${type} is not valid`,
                  (t: string): t is MarkType => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd', '64th', '128th'].indexOf(t) !== -1);
}