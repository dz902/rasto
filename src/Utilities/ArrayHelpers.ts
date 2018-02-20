export function last<T>(a: ReadonlyArray<T>): T | undefined {
    if (a.length === 0) {
        return undefined;
    }

    return a[a.length - 1];
}

export function flatten(input: any[]): any[] {
    let result: any[] = [];

    for (let i = 0, n = input.length; i < n; ++i) {
        let value = input[i];

        if (Array.isArray(value)) {
            result = result.concat(flatten(value));
        } else {
            result.push(value);
        }
    }

    return result;
}