import { Glyph, CharGlyph } from './index.js';

export class ClefGlyph extends CharGlyph {
    constructor(clefType: string, private clefLine: number) {
        super(clefType, 'clef');

        this.draw();
    }

    protected draw = (): void => {
        this.shiftFromStaffBottom(this.clefLine);
    }
}