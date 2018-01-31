import { Mark, MeasureAttributes } from '../Music.js';

export class Rest extends Mark {
    constructor(context: MeasureAttributes) {
        super("rest", context);
    }
}