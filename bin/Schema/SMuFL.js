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
    get defaults() {
        return this.engravingDefaults;
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