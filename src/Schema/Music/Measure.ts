import { Note, NoteRest, MusicalElement, Chord, ensureNumber, NumericValue } from '../Music.js';

export class Measure extends MusicalElement {
    readonly divisions: number;
    readonly timeBeats: number;
    readonly timeBeatType: number;
    readonly clefSign: string;
    readonly clefLine: number;
    readonly notes: NoteRest[] = [];
    readonly chords: Chord[] = [[]];

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

        let lastChord: Chord = this.chords[this.chords.length-1]
        let noteIsChordNote: boolean = note instanceof Note && note.isChordNote

        if (noteIsChordNote) {
            lastChord.push(note)
        } else {
            if (lastChord.length > 0) {
                let newLength = this.chords.push([])

                lastChord = this.chords[newLength-1]
            }

            lastChord.push(note)
        }
    }
}