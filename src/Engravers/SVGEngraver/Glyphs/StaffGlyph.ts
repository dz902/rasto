import { Glyph, LineGlyph } from './index.js';

export class StaffGlyph extends Glyph {
    constructor() {
        super('staff', undefined);

        this.draw();
    }

    protected draw = () => {
        this.drawLine();
    }

    private drawLine() {
        for (let i = 0; i < 5; ++i) {
            let line = new LineGlyph('staff-line');

            line.size(50)
                .move(undefined, i);

            this.append(line);
        }
    }
}