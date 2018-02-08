import { MusicalElement, NumericValue, ensureNumber } from '.';

export class Accidental extends MusicalElement {
    constructor(public type: string) {
        super();
    }
}