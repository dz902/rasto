"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class CharGlyph extends _1.Glyph {
    constructor(type, key, id) {
        super(type, id);
        this.draw = () => {
            this.textSVG = new _1.SVG('text');
            let codePoints = _1.Glyph.meta.getGlyphCodePoints(this.type, this.glyphKey);
            this.textSVG.addClass('glyph').addClass((this.type));
            this.textSVG.text(codePoints.codepoint);
            this.append(this.textSVG);
        };
        this.glyphKey = String(key); // number is ok
        // setNominalSize
        let nominalSize = _1.Glyph.meta.getGlyphSize(type, key);
        this.size(nominalSize.width, nominalSize.height);
        this.draw();
    }
}
exports.CharGlyph = CharGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhckdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvQ2hhckdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQWdDO0FBRWhDLGVBQXVCLFNBQVEsUUFBSztJQUloQyxZQUFZLElBQVksRUFBRSxHQUFvQixFQUFFLEVBQVc7UUFDdkQsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQVlWLFNBQUksR0FBRyxHQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQixJQUFJLFVBQVUsR0FBRyxRQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7UUFuQkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxlQUFlO1FBRTdDLGlCQUFpQjtRQUVqQixJQUFJLFdBQVcsR0FBRyxRQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztDQVlKO0FBM0JELDhCQTJCQyJ9