/**
 * Class representing an articulation that applies to a single chord.
 */
export class Articulation {
    constructor(readonly type: ArticulationType) {
    }
}

export enum ArticulationType {
    Accent, Staccato, Staccatissimo, Tenuto, Fermata
}

