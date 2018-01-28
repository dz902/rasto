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
