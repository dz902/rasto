import { Glyph, MeasureGlyph } from '../Glyphs.js';
import { Score, Measure } from '../../../Schema/Music.js'

export class ScoreGlyph extends Glyph {
    constructor(private score: Score) {
        super('score', score.id);

        this.draw();

        this.element.setAttribute('x', '50');
        this.element.setAttribute('y', '50');

        let style = Glyph.createElement('style');

        style.textContent = `
            @font-face {
                font-family: "Bravura";
                src: url(./Fonts/bravura/woff/Bravura.woff) format("woff");
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
            
            line.staffLine, line.barLineSingle, line.ledgerLine {
                stroke-width: ${2}px;
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
        }`;

        this.element.appendChild(style);
    }

    draw = (): void => {
        this.score.parts[0].measures.forEach((measure) => {
            let measureGlyph = new MeasureGlyph(measure);

            this.append(measureGlyph);
        });
    };
}