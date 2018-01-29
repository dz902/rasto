export class MusicalElement {
    constructor(id) {
        this.id = id;
    }
}
export function ensure(value, errorMessage, predicate) {
    if (predicate(value)) {
        return value;
    }
    else {
        throw new Error(errorMessage);
    }
}
//# sourceMappingURL=MusicalElement.js.map