import { Constituent } from './Constituent';
import { Context } from './Context';

export abstract class Container<T extends Container<any> | Constituent | Context> {
    protected content: T[] = [];

    take(item: T) {
        this.content.push(item);
    }
}