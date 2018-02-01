import { Glyph, RectGlyph } from './index.js';
import { Chord } from '../../../Schema/Music/index.js';

export class StemGlyph extends RectGlyph {
    private direction: StemDirection = StemDirection.Down;
    private stemWidth: number = Glyph.meta.defaults.stemThickness;
    private stemHeight: number;
    private midStaffPlace: number;

    constructor(private chord: Chord) {
        super(undefined, chord.id);

        this.stemHeight = (this.chord.highestNote.staffPlace-this.chord.lowestNote.staffPlace)/2 + 3.5;  // +1 octave
        this.midStaffPlace = chord.baseStaffPlace + 4;

        this.draw();
    }

    protected draw = (): void => {
        this.checkDirection();
        this.checkLoneLedgerNotes();
        this.calculateOffsets();
        this.size(this.stemWidth, this.stemHeight);
    }

    private checkDirection(): void {
        let chord = this.chord;
        let chordHasOnlyOneNote = chord.notes.length === 1;

        if (chordHasOnlyOneNote) {
            if (chord.lowestNote.staffPlace >= this.midStaffPlace) {
                this.direction = StemDirection.Down;
            } else {
                this.direction = StemDirection.Up;
            }
        } else {
            let topNoteDistance = Math.abs(chord.highestNote.staffPlace - this.midStaffPlace);
            let bottomNoteDistance = Math.abs(chord.lowestNote.staffPlace - this.midStaffPlace);

            if (topNoteDistance >= bottomNoteDistance) {
                this.direction = StemDirection.Down;
            } else {
                this.direction = StemDirection.Up;
            }
        }
    }

    private checkLoneLedgerNotes(): void {
        let chord = this.chord;

        let onlyUpperLedgeredNotes = (
            chord.highestNote.staffPlace > (chord.baseStaffPlace + 8) &&
            chord.lowestNote.staffPlace > (chord.baseStaffPlace + 8)
        );
        let onlyLowerLedgeredNotes = (
            chord.highestNote.staffPlace < chord.baseStaffPlace &&
            chord.lowestNote.staffPlace < chord.baseStaffPlace
        );

        let heightCompensation = 0;

        if (onlyLowerLedgeredNotes) {
            if (this.direction === StemDirection.Up) { // in future direction may be forced
                heightCompensation = (this.midStaffPlace - chord.lowestNote.staffPlace - 7) / 2;
            }
        } else if (onlyUpperLedgeredNotes) {
            if (this.direction === StemDirection.Down) {
                heightCompensation = (chord.highestNote.staffPlace - this.midStaffPlace - 7) / 2;
            }
        }

        this.stemHeight += heightCompensation > 0 ? heightCompensation : 0;
    }

    private calculateOffsets(): void {
        let chord = this.chord;
        let noteAnchors = Glyph.meta.getGlyphAnchors('note-head', chord.type);
        let offset: { x: number, y: number };

        // the following is confusing mainly because SMuFL use SW-y and Web uses NW-y
        // also because there is no good way to really have an anchor point for rects
        // may need refactor in the future to improve readability

        if (this.direction === StemDirection.Up) {
            offset = { x: noteAnchors['stemUpSE'][0]-this.stemWidth, y: -noteAnchors['stemUpSE'][1] };
            this.stemHeight += offset.y;
            this.invert();
        } else {
            offset = { x: noteAnchors['stemDownNW'][0], y: -noteAnchors['stemDownNW'][1] };
            this.stemHeight -= offset.y;
        }

        this.translate(offset.x, offset.y);
    }

    private invert(): void {
        this.translate(undefined, -this.stemHeight);
    }
}

enum StemDirection {
    Up,
    Down
}