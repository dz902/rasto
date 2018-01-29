import codePoints from '../Schema/SMuFL/glyphnames.js';

export interface Meta {
    engravingDefaults: EngravingDefaults;
    glyphBBoxes: GlyphBBoxList;
    glyphsWithAnchors: GlyphAnchorsList;
}

export interface EngravingDefaults {
    staffLineThickness: number;
    stemThickness: number;
    legerLineThickness: number;
    legerLineExtension: number;
}

export interface GlyphBBox {
    bBoxSW: AnchorPoint;
    bBoxNE: AnchorPoint;
}

export interface GlyphBBoxList {
    [key: string]: GlyphBBox;
}

export interface GlyphAnchors {
    [anchorName: string]: AnchorPoint;
}

export type GlyphAnchorsList = {
    [glyphName: string]: GlyphAnchors;
}

export type AnchorPoint = number[];

export interface GlyphCodePointList {
    [name: string]: GlyphCodePoint;
}

export interface GlyphCodePoint {
    alternateCodepoint?: string;
    codepoint: string;
}

export const formattedCodePoints = formatCodePoints(codePoints);

function formatCodePoints(codePoints: GlyphCodePointList): GlyphCodePointList {
    let convertCodePoint = (p: string): string => {
        let hex = p.match(/U\+([0-9A-F]+)/);

        if (hex === null) {
            throw new Error("invalid code point");
        }

        return String.fromCodePoint(Number.parseInt(hex[1], 16));
    };

    let formattedCodepoints: GlyphCodePointList = {};

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