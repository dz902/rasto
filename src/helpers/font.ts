import { FlagType, GlyphKind, MarkType, StemDirection, Positioned, Dimensioned, AccidentalType } from 'types';
import { mapValues } from 'lodash';

const fontCodePoints = require('fonts/meta/glyphnames.json');
const fontMeta = require('fonts/bravura/bravura_metadata.json');

let glyphsWithAlternates = fontMeta['glyphsWithAlternates'];

for (let k in glyphsWithAlternates) {
    glyphsWithAlternates[k]['alternates'].forEach((alternate: any) => {
        fontCodePoints[alternate['name']] = alternate;
    });

}

export function getEngravingDefaults(k: string): number {
    return fontMeta['engravingDefaults'][k];
}

export function getGlyphChar(kind: GlyphKind, name: string): string {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let codePoint = Number.parseInt(fontCodePoints[glyphKey]['codepoint'].match(/^U\+([0-9A-F]+)$/)[1], 16);

    return String.fromCodePoint(codePoint);
}

export function getGlyphDimensions(kind: GlyphKind, name: string): Dimensioned {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let bBox = fontMeta['glyphBBoxes'][glyphKey];

    return { width: bBox['bBoxNE'][0] - bBox['bBoxSW'][0],
             height: bBox['bBoxNE'][1] - bBox['bBoxSW'][1] };
}

export function getGlyphAnchors(kind: GlyphKind, name: string): Positioned | null {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let anchors = fontMeta['glyphsWithAnchors'][glyphKey];

    anchors = anchors ? mapValues(anchors, dupleToCoordinates) : null;

    return anchors;
}

function getGlyphKeyFromKindAndName(kind: GlyphKind, name: string): string {
    let lookupTable: { [k: string]: { [k: string]: string } } = {
        [GlyphKind.NoteHead]: {
            [MarkType.Whole]: 'noteWhole',
            [MarkType.Half]: 'noteheadHalf',
            [MarkType.Quarter]: 'noteheadBlack',
            [MarkType.N8th]: 'noteheadBlack',
            [MarkType.N16th]: 'noteheadBlack',
            [MarkType.N32th]: 'noteheadBlack',
            [MarkType.N64th]: 'noteheadBlack'
        },
        [GlyphKind.Flag]: {
            [FlagType.N8th+StemDirection.Up]: 'flag8thUp',
            [FlagType.N16th+StemDirection.Up]: 'flag16thUp',
            [FlagType.Internal+StemDirection.Up]: 'flagInternalUp',
            [FlagType.N8th+StemDirection.Down]: 'flag8thDown',
            [FlagType.N16th+StemDirection.Down]: 'flag16thDown',
            [FlagType.Internal+StemDirection.Down]: 'flagInternalDown'
        },
        [GlyphKind.Accidental]: {
            [AccidentalType.Sharp]: 'accidentalSharp',
            [AccidentalType.Flat]: 'accidentalFlat'
        }
    };

    let key = lookupTable[kind][name];

    if (key === undefined) {
        throw new Error('undefined glyph '+ name);
    }

    return key;
}

function dupleToCoordinates(anchor: [number, number]): Positioned {
    return { x: anchor[0], y: -anchor[1] };
}

