import { SVG, Glyph, MeasureGlyph, StaffGlyph } from './index.js';
import { Score } from '../../../Schema/Music/index.js';

export class ScoreGlyph extends Glyph {
    constructor(private score: Score) {
        super('score', score.id);

        this.element.setAttribute('x', '50');
        this.element.setAttribute('y', '100');

        let style = new SVG('style');

        style.text(`
            @font-face {
                font-family: "Bravura";
                src: url(../../src/Fonts/bravura/woff/Bravura.woff) format("woff");
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
                stroke-width: ${Glyph.meta.defaults.staffLineThickness*Glyph.STAFF_SPACE}px;
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

        SVG.invisibleSVG.appendChild(style.element.cloneNode(true)); // FIX: only temporary, needed for get correct dimensions
        this.append(style);

        // draw must come after styling

        this.draw();
    }

    protected draw = (): void => {
        let staff = new StaffGlyph();

        this.append(staff);

        this.score.parts[0].measures.forEach((measure) => {
            let measureGlyph = new MeasureGlyph(measure);

            this.append(measureGlyph);
        });
    };
}