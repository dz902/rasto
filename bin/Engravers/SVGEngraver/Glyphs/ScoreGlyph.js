"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Glyphs_1 = require("Engravers/SVGEngraver/Glyphs");
class ScoreGlyph extends Glyphs_1.Glyph {
    constructor(score) {
        super('score', score.id);
        this.score = score;
        this.draw = () => {
            let staff = new Glyphs_1.StaffGlyph();
            this.append(staff);
            this.score.parts[0].measures.forEach((measure, i) => {
                let measureGlyph = new Glyphs_1.MeasureGlyph(measure, measure.currentContext);
                this.append(measureGlyph);
                if (i !== 0) {
                    this.advance(measureGlyph, 20);
                }
            });
        };
        this.element.setAttribute('x', '50');
        this.element.setAttribute('y', '100');
        let style = new Glyphs_1.SVG('style');
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
                stroke-width: ${Glyphs_1.Glyph.meta.defaults.staffLineThickness * Glyphs_1.Glyph.STAFF_SPACE}px;
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
        Glyphs_1.SVG.invisibleSVG.appendChild(style.element.cloneNode(true)); // FIX: only temporary, needed for get correct dimensions
        this.append(style);
        // draw must come after styling
        this.draw();
    }
}
exports.ScoreGlyph = ScoreGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NvcmVHbHlwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9FbmdyYXZlcnMvU1ZHRW5ncmF2ZXIvR2x5cGhzL1Njb3JlR2x5cGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBb0Y7QUFHcEYsZ0JBQXdCLFNBQVEsY0FBSztJQUNqQyxZQUFvQixLQUFZO1FBQzVCLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRFQsVUFBSyxHQUFMLEtBQUssQ0FBTztRQW9EdEIsU0FBSSxHQUFHLEdBQVMsRUFBRTtZQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLG1CQUFVLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hELElBQUksWUFBWSxHQUFHLElBQUkscUJBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUVyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUUxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBL0RFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxZQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0IsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBaUJhLGNBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFDLGNBQUssQ0FBQyxXQUFXOzs7Ozs7Ozs7Ozs7Z0NBWXhELENBQUM7Ozs7O1VBS3ZCLENBQUMsQ0FBQztRQUVKLFlBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx5REFBeUQ7UUFDdEgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQiwrQkFBK0I7UUFFL0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Q0FpQko7QUFwRUQsZ0NBb0VDIn0=