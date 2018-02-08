import { CharGlyph } from './';

export class ClefGlyph extends CharGlyph {
    constructor(clefType: string, private clefLine: number) {
        super('clef', clefType);

        this.shiftFromStaffBottom(this.clefLine-1);
    }

    protected draw = (): void => {
    }
}