export abstract class Container<T> {
    private containerItems: T[] = [];

    get items(): ReadonlyArray<T> {
        return Object.freeze(this.containerItems);
    }

    addItem(item: T): this {
        this.containerItems.push(item);

        return this;
    }
}