import { Bindings } from './common';

export interface GlyphMeta {
    bBox: CoordinatesMap;
    anchors: CoordinatesMap;
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
    bBox: CoordinatesMap;
}

export interface Dimensioned extends Bindings {
    width: number;
    height: number;
}

export interface Clipped extends Bindings {
    clippingPoints: CoordinatesMap;
}

export type CoordinatesMap = {
    [k: string]: Coordinates
}