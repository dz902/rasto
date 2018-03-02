import { Bindings } from './common';

export type Coordinates = Positioned;
export interface Positioned extends Bindings {
    x: number;
    y: number;
}

export interface Anchored extends Bindings {
    anchor: Positioned;
}

export interface Dimensioned extends Bindings {
    width: number;
    height: number;
}