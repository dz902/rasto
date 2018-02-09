"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class LineGlyph extends _1.Glyph {
    constructor(type, id) {
        super(type, id);
        this.draw = () => {
        };
        this.lineSVG = new _1.SVG('line');
        this.append(this.lineSVG);
    }
    size(length) {
        this.lineSVG
            .setAttribute('x1', 0)
            .setAttribute('y1', 0)
            .setAttribute('x2', length * _1.Glyph.STAFF_SPACE)
            .setAttribute('y2', 0);
        return this;
    }
}
exports.LineGlyph = LineGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvTGluZUdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0JBQStCO0FBRS9CLGVBQXVCLFNBQVEsUUFBSztJQUdoQyxZQUFZLElBQVksRUFBRSxFQUFXO1FBQ2pDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFpQlYsU0FBSSxHQUFHLEdBQVMsRUFBRTtRQUM1QixDQUFDLENBQUE7UUFoQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDZixJQUFJLENBQUMsT0FBUTthQUNSLFlBQVksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQ3BCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3JCLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFDLFFBQUssQ0FBQyxXQUFXLENBQUM7YUFDNUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FJSjtBQXZCRCw4QkF1QkMifQ==