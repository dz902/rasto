export function last<T>(a: T[]): T | undefined {
    if (a.length === 0) {
        return undefined;
    }

    return a[a.length - 1];
}