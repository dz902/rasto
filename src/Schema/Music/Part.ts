import { Container } from './Container';
import { Chord } from './Chord';

export class Part extends Container<Chord> {
    protected content: Chord[] = [];

    get chords(): Chord[] {
        return this.content.concat([]);
    }
}