import { NoteHeadGlyph, Glyph, StemGlyph, CharGlyph } from './index.js';
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
        this.checkStem();
        this.checkFlag();
        this.checkAccidentals();
        this.shiftFromStaffBottom((this.chord.lowestNote.staffPlace - this.chord.contextStaffPlace) / 2);
    }
    get noteHeadWidth() {
        if (this.rawNoteHeadWidth === undefined) {
            let bbox = Glyph.meta.getGlyphBBox('note-head', this.chord.type);
            this.rawNoteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
        }
        return this.rawNoteHeadWidth;
    }
    drawNotes() {
        let drawNote = (note, i, notes) => {
            let noteHeadGlyph = new NoteHeadGlyph(note);
            let offsets = { x: 0, y: 0 };
            // checkAdjacentNotes
            let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
            let prevNote = notes[i - 1] ? notes[i - 1] : undefined;
            if (this.direction === StemDirection.Up) {
                let prevPrevNote = notes[i - 2] ? notes[i - 2] : undefined;
                let isNotConsecutive = prevNote && prevPrevNote && prevNote.getIntervalTo(prevPrevNote) !== 2;
                let isSecond = prevNote && note.getIntervalTo(prevNote) === 2;
                let needsDisplacement = isNotConsecutive && isSecond;
                if (needsDisplacement) {
                    offsets.x = this.noteHeadWidth;
                }
            }
            else {
                let nextNote = notes[i + 1] ? notes[i + 1] : undefined;
                let isNotConsecutive = prevNote === undefined || note.getIntervalTo(prevNote) !== 2;
                let isSecond = nextNote && note.getIntervalTo(nextNote) === 2;
                let needsDisplacement = isNotConsecutive && isSecond;
                offsets.x = this.noteHeadWidth;
                if (needsDisplacement) {
                    offsets.x = 0;
                }
            }
            // moveNoteToStaffPlace
            offsets.y = intervalToLowestNote - 1; // intervals starts with unison = 1
            noteHeadGlyph.move(offsets.x, -offsets.y / 2);
            this.append(noteHeadGlyph);
        };
        this.chord.notes.forEach(drawNote);
    }
    checkAccidentals() {
        // extractAccidentals
        let accidentals = []; // pitch-alter or accidental element
        this.chord.notes
            .filter(note => note.accidental !== null)
            .reverse()
            .forEach((note) => {
            let accidentalGlyph = new CharGlyph('accidental', note.accidental.type);
            this.append(accidentalGlyph);
        });
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
    checkStem() {
        if (this.chord.type === 'whole') {
            return;
        }
        this.stemGlyph = new StemGlyph();
        this.stemGlyph.height = this.chord.spanStaffPlace / 2 + 3.5; // +1 octave
        this.append(this.stemGlyph);
        // alignStem
        if (this.direction === StemDirection.Down) {
        }
        else {
        }
        // checkLedgerNoteStems
        this.checkLedgerNoteStems();
        this.checkStemOffsets();
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
        this.stemGlyph.height += heightGapToMidLine > 0 ? heightGapToMidLine : 0;
    }
    checkStemOffsets() {
        let chord = this.chord;
        // checkExtraSpaceForLigatures
        let longLigatureNoteTypes = ['32th', '64th', '128th'];
        let extraSpaces = longLigatureNoteTypes.indexOf(this.chord.type);
        if (extraSpaces > 0) {
            this.stemGlyph.height += extraSpaces;
        }
        // the following is confusing mainly because SMuFL use SW-y and Web uses NW-y
        // also because there is no good way to really have an anchor point for rects
        // may need refactor in the future to improve readability
        let offset;
        let noteAnchors = Glyph.meta.getGlyphAnchors('note-head', chord.type);
        if (this.direction === StemDirection.Up) {
            offset = {
                x: noteAnchors['stemUpSE'][0] - this.stemGlyph.width,
                y: -noteAnchors['stemUpSE'][1] // move opposite direction
            };
            this.stemGlyph.height -= noteAnchors['stemUpSE'][1]; // shorten stem to keep tip aligned
            offset.y -= this.stemGlyph.height;
        }
        else {
            offset = {
                x: noteAnchors['stemDownNW'][0],
                y: -noteAnchors['stemDownNW'][1] // move opposite direction
            };
            // we want stem in the middle, which is natural for up stem notes
            // because it is offseted like that, for down stem notes they are
            // offseted to put stem on the left of note, so we compensate note
            // width to make sure stem in the middle
            this.stemGlyph.height += noteAnchors['stemDownNW'][1]; // lengthen stem to keep tip aligned
            offset.x += this.noteHeadWidth;
            offset.y -= (this.chord.spanStaffPlace / 2);
        }
        this.stemGlyph.move(offset.x, offset.y);
    }
    checkFlag() {
        let noFlagNeeded = (this.chord.beams.length !== 0 ||
            this.chord.type === 'whole' ||
            this.chord.type === 'half' ||
            this.chord.type === 'quarter');
        if (noFlagNeeded) {
            return;
        }
        this.flagGlyph = new CharGlyph(`flag-${this.direction}`, this.chord.type);
        this.checkFlagOffsets();
        this.append(this.flagGlyph);
    }
    checkFlagOffsets() {
        let flagAnchors = Glyph.meta.getGlyphAnchors(`flag-${this.direction}`, this.chord.type);
        let offset;
        if (this.direction === StemDirection.Up) {
            offset = {
                x: flagAnchors['stemUpNW'][0],
                y: flagAnchors['stemUpNW'][1]
            };
        }
        else {
            offset = {
                x: flagAnchors['stemDownSW'][0],
                y: flagAnchors['stemDownSW'][1] + this.stemGlyph.height
            };
        }
        this.flagGlyph.move(this.stemGlyph.bbox.x, this.stemGlyph.bbox.y);
        this.flagGlyph.move(offset.x, offset.y);
    }
}
var StemDirection;
(function (StemDirection) {
    StemDirection["Up"] = "up";
    StemDirection["Down"] = "down";
})(StemDirection || (StemDirection = {}));
//# sourceMappingURL=ChordGlyph.js.map