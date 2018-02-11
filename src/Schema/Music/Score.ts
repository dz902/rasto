import { Container } from './Container';
import { Measure } from './Measure';

export class Score extends Container {
    protected content: Measure[] = [];

    get measures(): ReadonlyArray<Measure> {
        return Object.freeze(this.content.concat([]));
    }
}