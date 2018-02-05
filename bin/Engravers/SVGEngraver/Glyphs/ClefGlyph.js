import { CharGlyph } from './index.js';
export class ClefGlyph extends CharGlyph {
    constructor(clefType, clefLine) {
        super('clef', clefType);
        this.clefLine = clefLine;
        this.draw = () => {
            this.shiftFromStaffBottom(this.clefLine - 1);
        };
        this.draw();
    }
}
//# sourceMappingURL=ClefGlyph.js.map