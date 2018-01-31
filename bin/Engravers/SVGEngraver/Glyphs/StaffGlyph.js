import { Glyph } from '../Glyphs.js';
export class StaffGlyph extends Glyph {
    constructor() {
        super(...arguments);
        this.draw = () => {
            this.drawLine();
        };
    }
    drawLine() {
        let line = Glyph.createElement('rect');
    }
}
//# sourceMappingURL=StaffGlyph.js.map