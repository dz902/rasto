import { CharGlyph } from './index.js';
export class ClefGlyph extends CharGlyph {
    constructor(clefType, clefLine) {
        super(clefType, 'clef');
        this.clefLine = clefLine;
        this.draw = () => {
            this.shiftFromStaffBottom(this.clefLine / 2);
        };
        this.draw();
    }
}
//# sourceMappingURL=ClefGlyph.js.map