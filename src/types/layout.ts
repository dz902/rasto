import { Bindings } from './common';

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