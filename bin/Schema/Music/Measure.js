import { Note, MusicalElement, ensureNumber } from '../Music.js';
export class Measure extends MusicalElement {
    constructor(divisions, timeBeats, timeBeatUnit, clefSign, clefLine) {
        super();
        this.notes = [];
        this.chords = [[]];
        this.divisions = ensureNumber(divisions);
        this.timeBeats = ensureNumber(timeBeats);
        this.timeBeatType = ensureNumber(timeBeatUnit);
        this.clefSign = clefSign;
        this.clefLine = ensureNumber(clefLine);
    }
    addNote(note) {
        this.notes.push(note);
        let lastChord = this.chords[this.chords.length - 1];
        let noteIsChordNote = note instanceof Note && note.isChordNote;
        if (noteIsChordNote) {
            lastChord.push(note);
        }
        else {
            if (lastChord.length > 0) {
                let newLength = this.chords.push([]);
                lastChord = this.chords[newLength - 1];
            }
            lastChord.push(note);
        }
    }
}
//# sourceMappingURL=Measure.js.map