import { MusicalElement, MeasureContext, ensure } from '.';

export class Mark extends MusicalElement {
    constructor(protected _type: MarkType,
                readonly context: MeasureContext) {
        super();
    }

    get type(): MarkType {
        return this._type;
    }

    changeType(newType: MarkType): Mark {
        this._type = newType;

        return this;
    }
}

export const enum MarkType {
    Whole = 'whole',
    Half = 'half',
    Quarter = 'quarter',
    Eighth = 'eighth',
    N16th = '16th',
    N32nd = '32nd',
    N64th = '64th',
    N128th = '128th'
}

export function ensureMarkType(type: string): MarkType {
    let markTypeList: string[] = [
        MarkType.Whole,
        MarkType.Half,
        MarkType.Quarter,
        MarkType.Eighth,
        MarkType.N16th,
        MarkType.N32nd,
        MarkType.N64th,
        MarkType.N128th
    ];

    return ensure(type, `mark type ${type} is not valid`,
                  (t: string): t is MarkType => markTypeList.indexOf(t) !== -1);
}