import { GlyphKinds, MarkType } from '../types';

const fontMeta = require('Fonts/Bravura/bravura_metadata.json');

export function getEngravingDefaults(k: string): number {
    return fontMeta['engravingDefaults'][k];
}

export function getGlyphWidth(kind: GlyphKinds, name: string): number {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let bBox = fontMeta['glyphBBoxes'][glyphKey];

    return bBox['bBoxNE'][0] - bBox['bBoxSW'][0];
}

export function getGlyphAnchors(kind: GlyphKinds, name: string): { [k:string]: [number, number] } | null {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let anchors = fontMeta['glyphsWithAnchors'][glyphKey];

    return anchors || null;
}

function getGlyphKeyFromKindAndName(kind: GlyphKinds, name: string): string {
    let lookupTable: { [k: string]: { [k: string]: string } } = {
        [GlyphKinds.NoteHead]: {
            [MarkType.Whole]: 'noteWhole',
            [MarkType.Half]: 'noteheadHalf',
            [MarkType.Quarter]: 'noteheadBlack'
        }
    };

    let key = lookupTable[kind][name];

    if (key === undefined) {
        throw new Error('undefined glyph');
    }

    return key;
}

