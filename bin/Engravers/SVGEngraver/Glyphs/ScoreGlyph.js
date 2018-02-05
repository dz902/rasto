import { SVG, Glyph, MeasureGlyph, StaffGlyph } from './index.js';
export class ScoreGlyph extends Glyph {
    constructor(score) {
        super('score', score.id);
        this.score = score;
        this.draw = () => {
            let staff = new StaffGlyph();
            this.append(staff);
            this.score.parts[0].measures.forEach((measure) => {
                let measureGlyph = new MeasureGlyph(measure);
                this.append(measureGlyph);
            });
        };
        this.draw();
        this.element.setAttribute('x', '50');
        this.element.setAttribute('y', '100');
        let style = new SVG('style');
        style.text(`
            @font-face {
                font-family: "Bravura";
                src: url(../../Fonts/bravura/woff/Bravura.woff) format("woff");
            }
            svg.viewport {
                overflow: hidden;
            }
            svg, symbol {
                overflow: visible;
            }
            text.glyph {
                font-family: Bravura;
                font-size: 32px;
            }
            
            svg.staff-line line {
                stroke-width: ${Glyph.meta.defaults.staffLineThickness * Glyph.STAFF_SPACE}px;
                stroke: #000;
            }
            
            rect.stem {
            }
            
            polygon.beam {
                fill: red;
            }
            
            line.ledgerLine {
                stroke-width: ${2}px;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
        }`);
        this.append(style);
    }
}
//# sourceMappingURL=ScoreGlyph.js.map