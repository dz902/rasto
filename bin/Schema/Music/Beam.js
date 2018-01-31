import { MusicalElement, ensureNumber } from './index.js';
export class Beam extends MusicalElement {
    constructor(number, type) {
        super();
        this.number = ensureNumber(number);
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