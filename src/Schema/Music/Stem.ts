import { MusicalElement } from '.';

export class Stem extends MusicalElement {
    constructor(readonly type: string) {
        super();
    }

    configure() {}
}