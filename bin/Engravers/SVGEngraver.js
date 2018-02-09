"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Glyphs_1 = require("./SVGEngraver/Glyphs");
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
class SVGEngraver {
    static engrave(score) {
        let scoreGlyph = new Glyphs_1.ScoreGlyph(score);
        return (new Glyphs_1.SVG('svg')).append(scoreGlyph).element;
    }
}
exports.SVGEngraver = SVGEngraver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZHRW5ncmF2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvRW5ncmF2ZXJzL1NWR0VuZ3JhdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQXVEO0FBR3ZELE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNkLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFOUI7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQVk7UUFDdkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxtQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLE1BQU0sQ0FBaUIsQ0FBQyxJQUFJLFlBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDdkUsQ0FBQztDQUNKO0FBTkQsa0NBTUMifQ==