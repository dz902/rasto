import { Glyph } from './index.js';

export class MarkGlyph extends Glyph {
    shiftStaffPlace(staffPlace: number) {
        this.move(undefined, -staffPlace/2);
    }
}