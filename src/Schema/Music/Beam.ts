import { MusicalElement } from '../Music.js';

export class Beam extends MusicalElement {
    readonly number: number;
    readonly type: BeamType;

    constructor(readonly id: string,
                number: number,
                type: string) {
        super(id);

        this.number = number;
        this.type = ensureBeamType(type);
    }
}

type BeamType = 'begin' | 'continue' | 'end';

function ensureBeamType(type: string): BeamType {
    if (isBeamType(type)) {
        return type;
    } else {
        throw new Error(`type ${type} is not valid beam type`);
    }
}

function isBeamType(t: string): t is BeamType {
    return ['begin', 'continue', 'end'].indexOf(t) !== -1;
}
