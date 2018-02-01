import glyphnames from '../Schema/SMuFL/glyphnames.js';
import metadata from '../Fonts/bravura/bravura_metadata.js';
import { Attributes } from './Music/Common';
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

    private constructor(readonly engravingDefaults: EngravingDefaults,
                readonly glyphBBoxes: GlyphBBoxMap,
                readonly glyphWithAnchors: GlyphAnchorsMap,
                readonly glyphCodePointsMap: GlyphCodePointsMap) {
    }

    // QUERY

    getGlyphName(type: string, key: string): string {
        let table: Attributes;

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