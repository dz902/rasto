import { Glyph } from './index.js';
export class StaffItemGlyph extends Glyph {
    shift(staffPlace) {
        this.move(undefined, -staffPlace / 2);
    }
}
//# sourceMappingURL=StaffItemGlyph.js.map