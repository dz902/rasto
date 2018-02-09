"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glyphnames_1 = require("Schema/SMuFL/glyphnames");
const bravura_metadata_1 = require("Fonts/bravura/bravura_metadata");
class Meta {
    constructor(engravingDefaults, glyphBBoxes, glyphWithAnchors, glyphCodePointsMap) {
        this.engravingDefaults = engravingDefaults;
        this.glyphBBoxes = glyphBBoxes;
        this.glyphWithAnchors = glyphWithAnchors;
        this.glyphCodePointsMap = glyphCodePointsMap;
    }
    static load() {
        return new Meta(bravura_metadata_1.default.engravingDefaults, bravura_metadata_1.default.glyphBBoxes, bravura_metadata_1.default.glyphsWithAnchors, formatCodePoints(glyphnames_1.default));
    }
    get defaults() {
        return this.engravingDefaults;
    }
    // QUERY
    getGlyphName(type, key) {
        let table;
        switch (type) {
            case 'clef':
                table = {
                    'F': 'fClef',
                    'G': 'gClef'
                };
                break;
            case 'accidental':
                let k = String(key);
                table = {
                    [k]: 'accidental' + k.substr(0, 1).toUpperCase() + k.substr(1)
                };
                break;
            case 'note-head':
                table = {
                    'whole': 'noteWhole',
                    'half': 'noteheadHalf',
                    'quarter': 'noteheadBlack',
                    'eighth': 'noteheadBlack',
                    '16th': 'noteheadBlack',
                    '32nd': 'noteheadBlack',
                    '64th': 'noteheadBlack',
                    '128th': 'noteheadBlack'
                };
                break;
            case 'flag-up':
                table = {
                    'eighth': 'flag8thUp',
                    '16th': 'flag16thUp',
                    '32th': 'flag32thUp',
                    '64th': 'flag64thUp'
                };
                break;
            case 'flag-down':
                table = {
                    'eighth': 'flag8thDown',
                    '16th': 'flag16thDown',
                    '32th': 'flag32thDown',
                    '64th': 'flag64thDown'
                };
                break;
            case 'time':
                table = {
                    '0': 'timeSig0',
                    '1': 'timeSig1',
                    '2': 'timeSig2',
                    '3': 'timeSig3',
                    '4': 'timeSig4',
                    '5': 'timeSig5',
                    '6': 'timeSig6',
                    '7': 'timeSig7',
                    '8': 'timeSig8',
                    '9': 'timeSig9'
                };
                break;
            default:
                table = {};
        }
        let glyphName = table[String(key)];
        if (glyphName === undefined) {
            throw new Error(`unknown glyph ${type}-${key}`);
        }
        return glyphName;
    }
    getGlyphBBox(type, key) {
        let glyphName = this.getGlyphName(type, key);
        let glyphBBox = this.glyphBBoxes[glyphName];
        if (glyphBBox === undefined) {
            throw new Error(`no bbox data for glyph ${type}-${key}`);
        }
        return glyphBBox;
    }
    getGlyphCodePoints(type, key) {
        let glyphName = this.getGlyphName(type, key);
        let glyphCodePoints = this.glyphCodePointsMap[glyphName];
        if (glyphCodePoints === undefined) {
            throw new Error(`no code points for glyph ${type}-${key}`);
        }
        return glyphCodePoints;
    }
    getGlyphAnchors(type, key) {
        let glyphName = this.getGlyphName(type, key);
        let glyphAnchors = this.glyphWithAnchors[glyphName];
        if (glyphAnchors === undefined) {
            throw new Error(`no anchors for glyph ${type}-${key}`);
        }
        return glyphAnchors;
    }
    getGlyphSize(type, key) {
        let bbox = this.getGlyphBBox(type, key);
        return {
            width: bbox.bBoxNE[0] - bbox.bBoxSW[0],
            height: bbox.bBoxNE[1] - bbox.bBoxSW[1]
        };
    }
}
exports.Meta = Meta;
function formatCodePoints(codePoints) {
    let convertCodePoint = (p) => {
        let hex = p.match(/U\+([0-9A-F]+)/);
        if (hex === null) {
            throw new Error("invalid code point");
        }
        return String.fromCodePoint(Number.parseInt(hex[1], 16));
    };
    let formattedCodepoints = {};
    for (let name in codePoints) {
        let glyph = codePoints[name];
        formattedCodepoints[name] = {
            codepoint: convertCodePoint(glyph.codepoint)
        };
        if (glyph.alternateCodepoint) {
            formattedCodepoints[name].alternateCodepoint = convertCodePoint(glyph.alternateCodepoint);
        }
    }
    return formattedCodepoints;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU011RkwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2NoZW1hL1NNdUZMLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0RBQWlEO0FBQ2pELHFFQUFzRDtBQUd0RDtJQVVJLFlBQTRCLGlCQUFvQyxFQUMzQyxXQUF5QixFQUN6QixnQkFBaUMsRUFDakMsa0JBQXNDO1FBSC9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDM0MsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFDekIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQzNELENBQUM7SUFiRCxNQUFNLENBQUMsSUFBSTtRQUNQLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FDWCwwQkFBUSxDQUFDLGlCQUFpQixFQUMxQiwwQkFBUSxDQUFDLFdBQVcsRUFDcEIsMEJBQVEsQ0FBQyxpQkFBaUIsRUFDMUIsZ0JBQWdCLENBQUMsb0JBQVUsQ0FBQyxDQUMvQixDQUFDO0lBQ04sQ0FBQztJQVFELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVELFFBQVE7SUFFUixZQUFZLENBQUMsSUFBWSxFQUFFLEdBQW9CO1FBQzNDLElBQUksS0FBZ0IsQ0FBQztRQUVyQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1gsS0FBSyxNQUFNO2dCQUNQLEtBQUssR0FBRztvQkFDSixHQUFHLEVBQUUsT0FBTztvQkFDWixHQUFHLEVBQUUsT0FBTztpQkFDZixDQUFDO2dCQUVGLEtBQUssQ0FBQztZQUNWLEtBQUssWUFBWTtnQkFDYixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXBCLEtBQUssR0FBRztvQkFDSixDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENB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