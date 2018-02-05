import { CharGlyph } from './index.js';

export class ClefGlyph extends CharGlyph {
    constructor(clefType: string, private clefLine: number) {
        super('clef', clefType);

        this.draw();
    }

    protected draw = (): void => {
        this.shiftFromStaffBottom(this.clefLine-1);
    }
}