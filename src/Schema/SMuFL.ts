import glyphnames from '../Schema/SMuFL/glyphnames.js';
import metadata from '../Fonts/bravura/bravura_metadata.js';
import { SimpleMap } from './Music/Common';
import { Glyph } from '../Engravers/SVGEngraver/Glyphs/index';

export class Meta {
    static load(): Meta {
        return new Meta(
            metadata.engravingDefaults,
            metadata.glyphBBoxes,
            metadata.glyphsWithAnchors,
            formatCodePoints(glyphnames)
        );
    }

    private constructor(private engravingDefaults: EngravingDefaults,
                readonly glyphBBoxes: GlyphBBoxMap,
                readonly glyphWithAnchors: GlyphAnchorsMap,
                readonly glyphCodePointsMap: GlyphCodePointsMap) {
    }

    get defaults(): EngravingDefaults {
        return this.engravingDefaults;
    }

    // QUERY

    getGlyphName(type: string, key: string): string {
        let table: SimpleMap;

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
            default:
                table = {};
        }

        let glyphName = table[key];

        if (glyphName === undefined) {
            throw new Error(`unknown glyph ${type}-${key}`);
        }

        return glyphName;
    }

    getGlyphBBox(type: string, key: string): GlyphBBox {
        let glyphName = this.getGlyphName(type, key);
        let glyphBBox = this.glyphBBoxes[glyphName];

        if (glyphBBox === undefined) {
            throw new Error(`no bbox data for glyph ${type}-${key}`);
        }

        return glyphBBox;
    }

    getGlyphCodePoints(type: string, key: string): GlyphCodePoints {
        let glyphName = this.getGlyphName(type, key);
        let glyphCodePoints = this.glyphCodePointsMap[glyphName];

        if (glyphCodePoints === undefined) {
            throw new Error(`no code points for glyph ${type}-${key}`);
        }

        return glyphCodePoints;
    }

    getGlyphAnchors(type: string, key: string): GlyphAnchors {
        let glyphName = this.getGlyphName(type, key);
        let glyphAnchors = this.glyphWithAnchors[glyphName];

        if (glyphAnchors === undefined) {
            throw new Error(`no anchors for glyph ${type}-${key}`);
        }

        return glyphAnchors;
    }
}

export interface EngravingDefaults {
    staffLineThickness: number;
    stemThickness: number;
    legerLineThickness: number;
    legerLineExtension: number;
    beamThickness: number;
    beamSpacing: number;
}

export interface GlyphBBox {
    bBoxSW: AnchorPoint;
    bBoxNE: AnchorPoint;
}

export interface GlyphBBoxMap {
    [key: string]: GlyphBBox;
}

export interface GlyphAnchors {
    [anchorName: string]: AnchorPoint;
}

export type GlyphAnchorsMap = {
    [glyphName: string]: GlyphAnchors;
}

export type AnchorPoint = number[];

export interface GlyphCodePointsMap {
    [name: string]: GlyphCodePoints;
}

export interface GlyphCodePoints {
    alternateCodepoint?: string;
    codepoint: string;
}

function formatCodePoints(codePoints: GlyphCodePointsMap): GlyphCodePointsMap {
    let convertCodePoint = (p: string): string => {
        let hex = p.match(/U\+([0-9A-F]+)/);

        if (hex === null) {
            throw new Error("invalid code point");
        }

        return String.fromCodePoint(Number.parseInt(hex[1], 16));
    };

    let formattedCodepoints: GlyphCodePointsMap = {};

    for (let name in codePoints) {
        let glyph = codePoints[name];

        formattedCodepoints[name] = {
            codepoint: convertCodePoint(glyph.codepoint)
        }

        if (glyph.alternateCodepoint) {
            formattedCodepoints[name].alternateCodepoint = convertCodePoint(glyph.alternateCodepoint);
        }
    }

    return formattedCodepoints;
}