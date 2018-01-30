import { Note, Rest, NoteRest, MusicalElement, Mark, Chord, ensureNumber, NumericValue } from '../Music.js';
import { ensureChord } from './Chord';

export class Measure extends MusicalElement {
    readonly divisions: number;
    readonly timeBeats: number;
    readonly timeBeatType: number;
    readonly clefSign: string;
    readonly clefLine: number;
    readonly notes: NoteRest[] = [];
    readonly marks: Mark[] = [];

    constructor(divisions: NumericValue,
                timeBeats: NumericValue,
                timeBeatUnit: NumericValue,
                clefSign: string,
                clefLine: NumericValue) {
        super();

        this.divisions = ensureNumber(divisions);
        this.timeBeats = ensureNumber(timeBeats);
        this.timeBeatType = ensureNumber(timeBeatUnit);
        this.clefSign = clefSign;
        this.clefLine = ensureNumber(clefLine);
    }

    addNote(note: NoteRest) {
        this.notes.push(note);

        if (note instanceof Rest) {
            this.marks.push(note);
        } else if (note instanceof Note) {
            let lastMark: Mark = this.marks[this.marks.length-1];
            let lastMarkIsChord = lastMark instanceof Chord;
            let lastChord: Chord;


            if (lastMarkIsChord) {
                lastChord = <Chord> lastMark;
            } else {
                lastChord = new Chord(note.type);

                this.marks.push(lastChord);
            }

            let noteIsNotChordNote: boolean = !note.isChordNote;

            if (noteIsNotChordNote) {
                if (lastChord.notes.length > 0) {
                    let newChord = new Chord(note.type);

                    this.marks.push(newChord);

                    lastChord = newChord;
                }
            }

            lastChord.notes.push(note)
        } else {
            throw new Error();
        }
    }
}