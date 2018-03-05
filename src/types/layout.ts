import { Bindings } from './common';

export interface GlyphMeta {
    bBox: EdgePointMap;
    anchors: CoordinatesMap;
    clippingPoints: ClippingPointMap;
    char: string;
}

export type Coordinates = Positioned;

export interface Positioned extends Bindings {
    x: number;
    y: number;
}

export interface Anchored extends Bindings {
    anchor: Coordinates;
}

export interface BBoxed extends Bindings {
    bBox: EdgePointMap;
}

export interface Dimensioned extends Bindings {
    width: number;
    height: number;
}

export interface Clipped extends Bindings {
    clippingPoints: ClippingPointMap;
}

export interface ClippingPointMap {
    NW: Coordinates;
    NE: Coordinates;
    SW: Coordinates;
    SE: Coordinates;
}

export interface EdgePointMap {
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
