import { Container } from './Container';
import { Measure } from './Measure';
import { Chord } from './Chord';

export class Score extends Container<Measure> {
    protected content: Measure[] = [];

    get measures(): ReadonlyArray<Measure> {
        return Object.freeze(this.content.concat([]));
    }

    takeConstituentOrContext(chord: Chord) {
        let measure = new Measure();
    }

    addItem() {
        throw new Error('score does not take measure directly');
    }
}