export interface Bindings {
    [k: string]: any
}

export type Nullable<T> = T | null;
export type Partial<T> = {
    [P in keyof T]?: T[P];
}