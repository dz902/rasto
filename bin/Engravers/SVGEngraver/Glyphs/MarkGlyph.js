import { Glyph } from './index.js';
export class MarkGlyph extends Glyph {
    shiftStaffPlace(staffPlace) {
        this.move(undefined, -staffPlace / 2);
    }
}
//# sourceMappingURL=MarkGlyph.js.map