import { NoteHeadGlyph, Glyph, StemFlagGlyph } from './index.js';
export class ChordGlyph extends Glyph {
    constructor(chord) {
        super('chord', chord.id);
        this.chord = chord;
        this.direction = StemDirection.Down;
        // ensureNonEmptyChord
        let chordHasNoNotes = chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }
        // calculateMidStaffPlace
        this.midStaffPlace = chord.contextStaffPlace + 4;
        this.checkDirection();
        this.drawNotes();
        this.checkStemFlag();
        this.shiftFromStaffBottom((this.chord.lowestNote.staffPlace - this.chord.contextStaffPlace) / 2);
    }
    get width() {
        if (this.noteHeadWidth === undefined) {
            let bbox = Glyph.meta.getGlyphBBox('note-head', this.chord.type);
            this.noteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
        }
        return this.noteHeadWidth;
    }
    drawNotes() {
        this.chord.notes.forEach((note, i) => {
            let prevNote = this.chord.notes[i - 1] ? this.chord.notes[i - 1] : note;
            this.drawNote(note, prevNote);
        });
    }
    drawNote(note, prevNote) {
        let noteHeadGlyph = new NoteHeadGlyph(note);
        let offsets = { x: 0, y: 0 };
        // checkAdjacentNotes
        let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
        if (this.direction === StemDirection.Up) {
            let isNotThirds = intervalToLowestNote % 3 !== 0; // thirds always stay in place
            let isSecond = note.getIntervalTo(prevNote) === 2;
            let isAdjacent = isNotThirds && isSecond;
            if (isAdjacent) {
                offsets.x = this.width;
            }
        }
        else {
            let intervalToHighestNote = note.getIntervalTo(this.chord.highestNote);
            let isNotThirds = intervalToHighestNote % 3 !== 0; // thirds always stay in place
            let isNotTopNote = intervalToHighestNote !== 1;
            let needsDisplacement = isNotThirds && isNotTopNote;
            offsets.x = this.width;
            if (needsDisplacement) {
                offsets.x = 0;
            }
        }
        // moveNoteToStaffPlace
        offsets.y = intervalToLowestNote - 1; // intervals starts with unison = 1
        noteHeadGlyph.translate(offsets.x, -offsets.y / 2);
        this.append(noteHeadGlyph);
    }
    checkDirection() {
        let chord = this.chord;
        let chordHasOnlyOneNote = chord.notes.length === 1;
        if (chordHasOnlyOneNote) {
            if (chord.lowestNote.staffPlace >= this.midStaffPlace) {
                this.direction = StemDirection.Down;
            }
            else {
                this.direction = StemDirection.Up;
            }
        }
        else {
            let topNoteDistance = Math.abs(chord.highestNote.staffPlace - this.midStaffPlace);
            let bottomNoteDistance = Math.abs(chord.lowestNote.staffPlace - this.midStaffPlace);
            if (topNoteDistance >= bottomNoteDistance) {
                this.direction = StemDirection.Down;
            }
            else {
                this.direction = StemDirection.Up;
            }
        }
    }
    checkStemFlag() {
        if (this.chord.type === 'whole') {
            return;
        }
        this.stemFlagGlyph = new StemFlagGlyph(this.chord.spanStaffPlace / 2 + 3.5); // +1 octave
        this.append(this.stemFlagGlyph);
        // checkStemAlignment
        if (this.direction === StemDirection.Down) {
            this.stemFlagGlyph.shift(this.chord.spanStaffPlace / 2); // _p
            this.stemFlagGlyph.move(this.width);
        }
        // checkLedgerNoteStems
        this.checkLedgerNoteStems();
        this.checkStemOffsets();
        // checkFlag
    }
    checkLedgerNoteStems() {
        let chord = this.chord;
        let onlyUpperLedgeredNotes = (chord.highestNote.staffPlace > (chord.contextStaffPlace + 8) &&
            chord.lowestNote.staffPlace > (chord.contextStaffPlace + 8));
        let onlyLowerLedgeredNotes = (chord.highestNote.staffPlace < chord.contextStaffPlace &&
            chord.lowestNote.staffPlace < chord.contextStaffPlace);
        // compensateLedgerNoteStems
        let heightGapToMidLine = 0;
        if (onlyLowerLedgeredNotes) {
            if (this.direction === StemDirection.Up) {
                heightGapToMidLine = (this.midStaffPlace - chord.lowestNote.staffPlace - 7) / 2;
            }
        }
        else if (onlyUpperLedgeredNotes) {
            if (this.direction === StemDirection.Down) {
                heightGapToMidLine = (chord.highestNote.staffPlace - this.midStaffPlace - 7) / 2;
            }
        }
        this.stemFlagGlyph.height += heightGapToMidLine > 0 ? heightGapToMidLine : 0;
    }
    checkStemOffsets() {
        let chord = this.chord;
        let noteAnchors = Glyph.meta.getGlyphAnchors('note-head', chord.type);
        let offset;
        // the following is confusing mainly because SMuFL use SW-y and Web uses NW-y
        // also because there is no good way to really have an anchor point for rects
        // may need refactor in the future to improve readability
        if (this.direction === StemDirection.Up) {
            offset = {
                x: noteAnchors['stemUpSE'][0] - this.stemFlagGlyph.width,
                y: -noteAnchors['stemUpSE'][1] // move opposite direction
            };
            this.stemFlagGlyph.height -= noteAnchors['stemUpSE'][1]; // shorten stem to keep tip aligned
            this.stemFlagGlyph.invert(); // make stem foot origin
        }
        else {
            offset = {
                x: noteAnchors['stemDownNW'][0],
                y: -noteAnchors['stemDownNW'][1] // move opposite direction
            };
            this.stemFlagGlyph.height += noteAnchors['stemDownNW'][1]; // lengthen stem to keep tip aligned
        }
        this.stemFlagGlyph.translate(offset.x, offset.y);
    }
}
var StemDirection;
(function (StemDirection) {
    StemDirection[StemDirection["Up"] = 0] = "Up";
    StemDirection[StemDirection["Down"] = 1] = "Down";
})(StemDirection || (StemDirection = {}));
//# sourceMappingURL=ChordGlyph.js.map