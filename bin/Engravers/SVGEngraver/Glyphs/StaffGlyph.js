import { Glyph, LineGlyph } from './index.js';
export class StaffGlyph extends Glyph {
    constructor() {
        super('staff', undefined);
        this.draw = () => {
            this.drawLine();
        };
        this.draw();
    }
    drawLine() {
        for (let i = 0; i < 5; ++i) {
            let line = new LineGlyph('staff-line');
            line.size(50)
                .move(undefined, i);
            this.append(line);
        }
    }
}
//# sourceMappingURL=StaffGlyph.js.map