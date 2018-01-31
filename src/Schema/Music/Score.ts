import { MusicalElement, Measure } from './index.js';

export class Score extends MusicalElement {
    readonly parts: Part[] = [];
}

export class Part extends MusicalElement {
    readonly measures: Measure[] = [];

    constructor(id: string,
                readonly name: string) {
        super(id);
    }
}