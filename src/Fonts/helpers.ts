import { FlagType, GlyphKind, MarkType, StemDirection } from '../types';

const fontCodePoints = require('Fonts/Meta/glyphnames.json');
const fontMeta = require('Fonts/Bravura/bravura_metadata.json');

export function getEngravingDefaults(k: string): number {
    return fontMeta['engravingDefaults'][k];
}

export function getGlyphChar(kind: GlyphKind, name: string): string {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let codePoint = Number.parseInt(fontCodePoints[glyphKey]['codepoint'].match(/^U\+([0-9A-F]+)$/)[1], 16);

    return String.fromCodePoint(codePoint);
}

export function getGlyphWidth(kind: GlyphKind, name: string): number {
    return getGlyphDimensions(kind, name).width;
}

export function getGlyphDimensions(kind: GlyphKind, name: string): { width: number, height: number } {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let bBox = fontMeta['glyphBBoxes'][glyphKey];

    return { width: bBox['bBoxNE'][0] - bBox['bBoxSW'][0],
             height: bBox['bBoxNE'][1] - bBox['bBoxSW'][1] };
}

export function getGlyphAnchors(kind: GlyphKind, name: string): { [k:string]: [number, number] } | null {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let anchors = fontMeta['glyphsWithAnchors'][glyphKey];

    return anchors || null;
}

function getGlyphKeyFromKindAndName(kind: GlyphKind, name: string): string {
    let lookupTable: { [k: string]: { [k: string]: string } } = {
        [GlyphKind.NoteHead]: {
            [MarkType.Whole]: 'noteWhole',
            [MarkType.Half]: 'noteheadHalf',
            [MarkType.Quarter]: 'noteheadBlack',
            [MarkType.N8th]: 'noteheadBlack'
        },
        [GlyphKind.Flag]: {
            [FlagType.N8th+StemDirection.Up]: 'flag8thUp',
            [FlagType.N8th+StemDirection.Down]: 'flag8thDown',
            [FlagType.N16th+StemDirection.Down]: 'flag16thDown',
            [FlagType.Internal+StemDirection.Down]: 'flagInternalDown'
        }
    };

    let key = lookupTable[kind][name];

    if (key === undefined) {
        throw new Error('undefined glyph '+ name);
    }

    return key;
}

