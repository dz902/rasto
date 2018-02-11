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

