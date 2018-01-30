export class MusicalElement {
    constructor() {
        this.id = uniq();
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
function uniq() {
    return String(performance.now()).split('.').join('');
}
//# sourceMappingURL=MusicalElement.js.map