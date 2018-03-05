import { Binding } from './common';

export interface GlyphMeta {
    bBox: BBoxPointMap;
    anchors: CoordinatesMap;
    clippingPoints: ClippingPointMap;
    char: string;
}

export type Coordinates = Positioned;

export interface Positioned extends Binding {
    x: number;
    y: number;
}

export interface Anchored extends Binding {
    anchor: Coordinates;
}

export interface BBoxed extends Binding {
    bBox: BBoxPointMap;
}

export interface Dimensioned extends Binding {
    width: number;
    height: number;
}

export interface Clipped extends Binding {
    clippingPoints: ClippingPointMap;
}

export interface ClippingPointMap {
    NW: Coordinates;
    NE: Coordinates;
    SW: Coordinates;
    SE: Coordinates;
}

export interface BBoxPointMap {
    NE: Coordinates;
    SW: Coordinates;
}

export interface CoordinatesMap {
    [k: string]: Coordinates
}

export interface DupleMap {
    [k: string]: Duple;
}

export interface SimpleMap<T> {
    [k: string]: T;
}

export type Duple = [number, number];

export type SMuFLFontMeta = {
    engravingDefaults: SimpleMap<number>,
    glyphBBoxes: SimpleMap<DupleMap>,
    glyphsWithAnchors: SimpleMap<DupleMap>,
    glyphsWithAlternates: SimpleMap<{
        alternates: SimpleMap<string>[]
    }>
}

export interface NoteHeadGlyph extends BBoxed, Positioned {
    isDisplaced: boolean;
}

export interface StemGlyph extends Positioned, Dimensioned {
    isVirtual: boolean;
}

export interface FlagGlyph extends Positioned {
}

export interface AccidentalGlyph extends Positioned, BBoxed, Clipped {

}
