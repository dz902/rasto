import { Mark, MeasureContext } from 'Schema/Music';

export class Rest extends Mark {
    constructor(context: MeasureContext) {
        super("rest", context);
    }
}