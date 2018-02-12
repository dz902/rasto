import { Constituent } from './Constituent';
import { Context } from './Context';

export interface Container<T extends Container<any> | Constituent | Context> {
    readonly items: ReadonlyArray<T>;
    addItem(item: T): Container<T>;
}