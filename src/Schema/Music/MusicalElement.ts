export class MusicalElement {
    constructor(readonly id: string) {

    }
}

export function ensure<U, T>(value: U, errorMessage: string, predicate: (value: U) => any): T {
    if (predicate(value)) {
        return value as any as T;
    } else {
        throw new Error(errorMessage);
    }
}