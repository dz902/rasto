import { MusicalElement } from '../Music.js';
export class Beam extends MusicalElement {
    constructor(id, number, type) {
        super(id);
        this.id = id;
        this.number = number;
        this.type = ensureBeamType(type);
    }
}
function ensureBeamType(type) {
    if (isBeamType(type)) {
        return type;
    }
    else {
        throw new Error(`type ${type} is not valid beam type`);
    }
}
function isBeamType(t) {
    return ['begin', 'continue', 'end'].indexOf(t) !== -1;
}
//# sourceMappingURL=Beam.js.map