export abstract class Container<T> {
    private containerItems: T[] = [];

    get items(): ReadonlyArray<T> {
        return Object.freeze(this.containerItems);
    }

    addItem(item: T): Container<T> {
        this.containerItems.push(item);

        return this;
    }
}