import { Note, Rest, MusicalElement, Chord, ensureNumber } from '../Music.js';
export class Measure extends MusicalElement {
    constructor(divisions, timeBeats, timeBeatUnit, clefSign, clefLine) {
        super();
        this.notes = [];
        this.marks = [];
        this.divisions = ensureNumber(divisions);
        this.timeBeats = ensureNumber(timeBeats);
        this.timeBeatType = ensureNumber(timeBeatUnit);
        this.clefSign = clefSign;
        this.clefLine = ensureNumber(clefLine);
    }
    addNote(note) {
        this.notes.push(note);
        if (note instanceof Rest) {
            this.marks.push(note);
        }
        else if (note instanceof Note) {
            let lastMark = this.marks[this.marks.length - 1];
            let lastMarkIsChord = lastMark instanceof Chord;
            let lastChord;
            if (lastMarkIsChord) {
                lastChord = lastMark;
            }
            else {
                lastChord = new Chord(note.type);
                this.marks.push(lastChord);
            }
            let noteIsNotChordNote = !note.isChordNote;
            if (noteIsNotChordNote) {
                if (lastChord.notes.length > 0) {
                    let newChord = new Chord(note.type);
                    this.marks.push(newChord);
                    lastChord = newChord;
                }
            }
            lastChord.notes.push(note);
        }
        else {
            throw new Error();
        }
    }
}
//# sourceMappingURL=Measure.js.map