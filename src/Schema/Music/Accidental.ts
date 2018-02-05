import { MusicalElement, NumericValue, ensureNumber } from './index.js';

export class Accidental extends MusicalElement {
    constructor(public type: string) {
        super();
    }
}