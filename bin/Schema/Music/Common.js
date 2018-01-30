export class MusicalElement {
    constructor(id) {
        this.data = {};
        this.id = id ? id : uniq();
    }
    addData(k, value) {
        this.data[k] = value;
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
export function ensureNumber(value) {
    let numericValue = Number(value);
    return ensure(numericValue, `value ${value} is not a valid number`, (n) => !Number.isNaN(n));
}
// PRIVATE
function uniq() {
    return String(performance.now()).split('.').join('');
}
//# sourceMappingURL=Common.js.map