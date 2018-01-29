import { Note, MusicalElement } from '../Music.js';

export default class Measure extends MusicalElement {
    readonly divisions: number;
    readonly timeBeats: number;
    readonly timeBeatUnit: number;
    readonly clefSign: number;
    readonly clefLine: number;
    readonly notes: Note[] = [];

    constructor(readonly id: string,
                timeBeats: number,
                timeBeatUnit: number,
                clefSign: number,
                clefLine: number) {
        super(id);

        this.timeBeats = timeBeats;
        this.timeBeatUnit = timeBeatUnit;
        this.clefSign = clefSign;
        this.clefLine = clefLine;
    }
}