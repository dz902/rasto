"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class ScoreGlyph extends _1.Glyph {
    constructor(score) {
        super('score', score.id);
        this.score = score;
        this.draw = () => {
            let staff = new _1.StaffGlyph();
            this.append(staff);
            this.score.parts[0].measures.forEach((measure, i) => {
                let measureGlyph = new _1.MeasureGlyph(measure);
                this.append(measureGlyph);
                if (i !== 0) {
                    this.advance(measureGlyph, 20);
                }
            });
        };
        this.element.setAttribute('x', '50');
        this.element.setAttribute('y', '100');
        let style = new _1.SVG('style');
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
                stroke-width: ${_1.Glyph.meta.defaults.staffLineThickness * _1.Glyph.STAFF_SPACE}px;
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
        _1.SVG.invisibleSVG.appendChild(style.element.cloneNode(true)); // FIX: only temporary, needed for get correct dimensions
        this.append(style);
        // draw must come after styling
        this.draw();
    }
}
exports.ScoreGlyph = ScoreGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NvcmVHbHlwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9FbmdyYXZlcnMvU1ZHRW5ncmF2ZXIvR2x5cGhzL1Njb3JlR2x5cGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBeUQ7QUFHekQsZ0JBQXdCLFNBQVEsUUFBSztJQUNqQyxZQUFvQixLQUFZO1FBQzVCLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRFQsVUFBSyxHQUFMLEtBQUssQ0FBTztRQW9EdEIsU0FBSSxHQUFHLEdBQVMsRUFBRTtZQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLGFBQVUsRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxlQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRTFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUEvREUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3QixLQUFLLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztnQ0FpQmEsUUFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUMsUUFBSyxDQUFDLFdBQVc7Ozs7Ozs7Ozs7OztnQ0FZeEQsQ0FBQzs7Ozs7VUFLdkIsQ0FBQyxDQUFDO1FBRUosTUFBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDtRQUN0SCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5CLCtCQUErQjtRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztDQWlCSjtBQXBFRCxnQ0FvRUMifQ==