import {
    FlagType, GlyphKind, MarkType, StemDirection, Positioned, BBoxed, AccidentalType, Coordinates,
    GlyphMeta, CoordinatesMap, ClippingPointMap, SMuFLFontMeta, BBoxPointMap, Dimensioned
} from 'types';
import { computeDimensions } from './layout';
import { mapValues } from 'lodash';

const fontCodePoints = require('fonts/meta/glyphnames.json');
const fontMeta: SMuFLFontMeta = require('fonts/bravura/bravura_metadata.json');

let glyphsWithAlternates = fontMeta['glyphsWithAlternates'];

for (let k in glyphsWithAlternates) {
    glyphsWithAlternates[k].alternates.forEach((alternate: any) => {
        fontCodePoints[alternate['name']] = alternate;
    });
}

export function getEngravingDefaults(k: string): number {
    return fontMeta.engravingDefaults[k];
}

export function getGlyphMeta(kind: GlyphKind, name: string): GlyphMeta {
    let glyphKey = getGlyphKeyFromKindAndName(kind, name);
    let rawBBox = mapValues(fontMeta.glyphBBoxes[glyphKey], dupleToCoordinates);
    let bBox: BBoxPointMap = {
        NE: rawBBox['bBoxNE'],
        SW: rawBBox['bBoxSW']
    };

    let rawAnchors = fontMeta.glyphsWithAnchors[glyphKey] || {};
    let anchors: CoordinatesMap = mapValues(rawAnchors, dupleToCoordinates);

    let dimensions: Dimensioned = computeDimensions({ bBox });
    let clippingPoints: ClippingPointMap = {
        NE: anchors['cutOutNE'] || { x: dimensions.width, y: -dimensions.height },
        NW: anchors['cutOutNW'] || { x: 0, y: -dimensions.height },
        SE: anchors['cutOutSE'] || { x: dimensions.width, y: 0 },
        SW: anchors['cutOutSW'] || { x: 0, y: 0 }
    };

    let codePoint = Number.parseInt(fontCodePoints[glyphKey]['codepoint'].match(/^U\+([0-9A-F]+)$/)[1], 16);
    let char = String.fromCodePoint(codePoint);

    return {
        bBox,
        anchors,
        clippingPoints,
        char
    };
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

function dupleToCoordinates(duple: [number, number]): Coordinates {
    return { x: duple[0], y: -duple[1] };
}

