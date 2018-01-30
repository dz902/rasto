import { MusicalElement } from '../Music.js';

export class Stem extends MusicalElement {
    constructor(readonly type: string) {
        super();
    }

    configure() {}
}