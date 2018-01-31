import { MusicalElement } from './index.js';

export class Stem extends MusicalElement {
    constructor(readonly type: string) {
        super();
    }

    configure() {}
}