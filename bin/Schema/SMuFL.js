import glyphnames from '../Schema/SMuFL/glyphnames.js';
import metadata from '../Fonts/bravura/bravura_metadata.js';
export class Meta {
    constructor(engravingDefaults, glyphBBoxes, glyphWithAnchors, glyphCodePointsMap) {
        this.engravingDefaults = engravingDefaults;
        this.glyphBBoxes = glyphBBoxes;
        this.glyphWithAnchors = glyphWithAnchors;
        this.glyphCodePointsMap = glyphCodePointsMap;
    }
    static load() {
        return new Meta(metadata.engravingDefaults, metadata.glyphBBoxes, metadata.glyphsWithAnchors, formatCodePoints(glyphnames));
    }
    // QUERY
    getGlyphName(type, key) {
        let table;
        switch (type) {
            case 'clef':
                table = {
                    'G': 'gClef'
                };
                break;
            case 'note-head':
                table = {
                    'whole': 'noteWhole',
                    'half': 'noteheadHalf',
                    'quarter': 'noteheadBlack',
                    'eighth': 'noteheadBlack',
                    '16th': 'noteheadBlack',
                    '32nd': 'noteheadBlack'
                };
                break;
            default:
                table = {};
        }
        let glyphName = table[key];
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
}
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
//# sourceMappingURL=SMuFL.js.map