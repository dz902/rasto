import { Glyph } from '../Glyphs.js';
export class MarkGlyph extends Glyph {
    shiftStaffPlace(staffPlace) {
        this.move(undefined, -staffPlace / 2);
    }
}
//# sourceMappingURL=NoteRestGlyph.js.map