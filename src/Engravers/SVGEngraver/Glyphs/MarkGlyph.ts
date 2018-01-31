import { Glyph } from '../Glyphs.js';

export class MarkGlyph extends Glyph {
    shiftStaffPlace(staffPlace: number) {
        this.move(undefined, -staffPlace/2);
    }
}