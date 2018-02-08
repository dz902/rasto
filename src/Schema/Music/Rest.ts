import { Mark, MeasureAttributes } from '.';

export class Rest extends Mark {
    constructor(context: MeasureAttributes) {
        super("rest", context);
    }
}