import { Mark, MeasureAttributes } from './index.js';

export class Rest extends Mark {
    constructor(context: MeasureAttributes) {
        super("rest", context);
    }
}