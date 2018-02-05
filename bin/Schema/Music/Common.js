export class MusicalElement {
    constructor(id) {
        this.data = {};
        this.id = id ? id : uniq();
    }
    addData(k, value) {
        this.data[k] = value;
    }
}
export class StaffPlace {
    static octave(i) {
        return i * 7 - 1;
    }
    static third() {
        return 3;
    }
}
export function maybeThen(value, thenCallback) {
    if (value !== undefined && value !== null) {
        return thenCallback(value);
    }
    else {
        return null;
    }
}
export function maybe(value) {
    if (value !== undefined) {
        return value;
    }
    else {
        return null;
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
export function diff(keys, a, b) {
    let isDiff = false;
    let result = {};
    for (let k of keys) {
        if (b[k] !== a[k]) {
            isDiff = true;
            result[k] = b[k];
        }
        else {
            result[k] = a[k]; // still keep original key and value
        }
    }
    return isDiff ? result : null;
}
export function ensureNumber(value) {
    let numericValue = Number(value);
    return ensure(numericValue, `value ${value} is not a valid number`, (n) => !Number.isNaN(n));
}
// HELPERS, to be moved later
export function toNameCase(s) {
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
}
export function toCamelCase(ss, i) {
    return i === 0 ? ss.toLowerCase() : toNameCase(ss);
}
// PRIVATE
function uniq() {
    return String(performance.now()).split('.').join('');
}
//# sourceMappingURL=Common.js.map