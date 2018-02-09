"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class RectGlyph extends _1.Glyph {
    constructor(type, id) {
        super(type, id);
        this.rectSVG = new _1.SVG('rect');
        this.append(this.rectSVG);
    }
    // pitfall here, when defining a setter, getter of the same name
    // is removed from inheritance, which means you will have to do
    // something really stupid like the following, setters could be
    // replaced by methods and should work, but it closes doors to
    // shortcuts like += / -=
    get width() {
        return super.width;
    }
    set width(width) {
        this.size(width);
        this.rectSVG.width = Number(this.rawElement.getAttribute('width')); // UGLY
    }
    get height() {
        return super.height;
    }
    set height(height) {
        this.size(undefined, height);
        this.rectSVG.height = Number(this.rawElement.getAttribute('height')); // UGLY
    }
}
exports.RectGlyph = RectGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdEdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvUmVjdEdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0JBQStCO0FBRS9CLGVBQXVCLFNBQVEsUUFBSztJQUdoQyxZQUFZLElBQWEsRUFBRSxFQUFXO1FBQ2xDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLCtEQUErRDtJQUMvRCwrREFBK0Q7SUFDL0QsOERBQThEO0lBQzlELHlCQUF5QjtJQUV6QixJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUUsT0FBTztJQUNoRixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLE1BQWM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBRSxPQUFPO0lBQ2xGLENBQUM7Q0FDSjtBQWxDRCw4QkFrQ0MifQ==