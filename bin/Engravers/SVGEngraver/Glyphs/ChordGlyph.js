"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Music_1 = require("Schema/Music");
class ChordGlyph extends _1.Glyph {
    constructor(chord) {
        super('chord', chord.id);
        this.chord = chord;
        this.hasAdjacentNotes = false;
        this.accidentalGlyphs = [];
        // ensureNonEmptyChord
        let chordHasNoNotes = chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }
        this.drawNotes();
        this.checkStem();
        this.checkFlag();
        this.checkAccidentals();
        this.shiftFromStaffBottom((this.chord.lowestNote.staffPlace - this.chord.context.bottomStaffPlace) / 2);
    }
    get noteHeadWidth() {
        if (this.rawNoteHeadWidth === undefined) {
            let bbox = _1.Glyph.meta.getGlyphBBox('note-head', this.chord.type);
            this.rawNoteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
        }
        return this.rawNoteHeadWidth;
    }
    drawNotes() {
        let isOffsetting = false;
        let drawNote = (note, i, notes) => {
            let noteHeadGlyph = new _1.NoteHeadGlyph(note);
            let offsetX = 0;
            // checkAdjacentNotes
            let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
            let prevNote = notes[i - 1] ? notes[i - 1] : undefined;
            let isSecond = prevNote && note.getIntervalTo(prevNote) === 2;
            let needsDisplacement = !isOffsetting && isSecond;
            if (this.chord.direction === Music_1.StemDirection.Up) {
                if (needsDisplacement) {
                    offsetX = this.noteHeadWidth;
                    isOffsetting = true;
                }
                else {
                    isOffsetting = false;
                }
            }
            else {
                if (needsDisplacement) {
                    offsetX = 0;
                    isOffsetting = true;
                }
                else {
                    offsetX = this.noteHeadWidth;
                    isOffsetting = false;
                }
            }
            if (needsDisplacement) {
                this.hasAdjacentNotes = true;
            }
            // moveNoteToStaffPlace
            noteHeadGlyph.move(offsetX);
            noteHeadGlyph.shiftInterval(intervalToLowestNote);
            this.append(noteHeadGlyph);
        };
        if (this.chord.direction === Music_1.StemDirection.Up) {
            this.chord.notes.forEach(drawNote);
        }
        else {
            this.chord.notes.concat([]).reverse().forEach(drawNote); // non-destructive
        }
    }
    checkAccidentals() {
        let baseAccidentalGlyph;
        this.chord.notes
            .filter(note => note.accidental !== undefined)
            .reverse()
            .forEach((note, i, notes) => {
            let prevNote = i - 1 >= 0 ? notes[i - 1] : undefined;
            let accidentalGlyph = new _1.CharGlyph('accidental', note.accidental.type);
            this.append(accidentalGlyph);
            // moveAccidentalToStaffPlace
            let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
            accidentalGlyph.shiftInterval(intervalToLowestNote);
            // checkDisplacement
            let offsetX = 0;
            let isHighestAccidental = (i === 0);
            if (isHighestAccidental) {
                baseAccidentalGlyph = accidentalGlyph;
            }
            else {
                let isNewBaseAccidental = !accidentalGlyph.overlapsWith(baseAccidentalGlyph);
                if (isNewBaseAccidental) {
                    // detectNewBaseAccidental
                    baseAccidentalGlyph = accidentalGlyph;
                }
                else {
                    // moveToLeftOfPrevAccidental
                    let prevAccidentalGlyph = this.accidentalGlyphs[i - 1];
                    offsetX += prevAccidentalGlyph.bbox.x;
                    accidentalGlyph.move(offsetX);
                    accidentalGlyph.move(-accidentalGlyph.width);
                    // detectCutOuts
                    let anchors = _1.Glyph.meta.getGlyphAnchors('accidental', note.accidental.type);
                    let prevAnchors = _1.Glyph.meta.getGlyphAnchors('accidental', prevNote.accidental.type);
                    let hasCommonCutOutAnchors = anchors['cutOutNE'] && prevAnchors['cutOutSW'];
                    if (hasCommonCutOutAnchors) {
                        let prevBBox = prevAccidentalGlyph.bbox;
                        let bBox = accidentalGlyph.bbox;
                        let prevGlyphCutOutBottomIsHigherThanGlyphTop = (prevBBox.y + prevAccidentalGlyph.height - prevAnchors['cutOutSW'][1] <= bBox.y);
                        let glyphCutOutTopIsLowerThanPrevGlyphBottom = (bBox.y - (accidentalGlyph.height - anchors['cutOutNE'][1]) <= prevBBox.y + prevAccidentalGlyph.height);
                        let kerningNeeded = (prevGlyphCutOutBottomIsHigherThanGlyphTop &&
                            glyphCutOutTopIsLowerThanPrevGlyphBottom);
                        if (kerningNeeded) {
                            let kerningOffsetX = Math.min(accidentalGlyph.width - anchors['cutOutNE'][0], prevAnchors['cutOutSW'][0]);
                            accidentalGlyph.move(kerningOffsetX);
                        }
                    }
                }
            }
            this.accidentalGlyphs.push(accidentalGlyph);
        });
        // checkStemDirectionDisplacement
        let highestAccidentalGlyph = this.accidentalGlyphs[0];
        if (this.chord.direction === Music_1.StemDirection.Up) {
            if (highestAccidentalGlyph) {
                this.accidentalGlyphs.forEach(a => a.move(-highestAccidentalGlyph.width - 0.2)); // fix with meta
            }
        }
        else {
            if (this.hasAdjacentNotes) {
                this.accidentalGlyphs.forEach(a => a.move(-highestAccidentalGlyph.width - 0.2)); // fix with meta
            }
        }
    }
    checkStem() {
        if (this.chord.type === 'whole') {
            return;
        }
        this.stemGlyph = new _1.StemGlyph();
        this.stemGlyph.height = this.chord.spanStaffPlace / 2 + 3.5; // +1 octave
        this.append(this.stemGlyph);
        // checkLedgerNoteStems
        this.checkLedgerNoteStems();
        this.checkStemOffsets();
    }
    checkLedgerNoteStems() {
        let chord = this.chord;
        let onlyUpperLedgeredNotes = (chord.highestNote.staffPlace > (chord.context.bottomStaffPlace + 8) &&
            chord.lowestNote.staffPlace > (chord.context.bottomStaffPlace + 8));
        let onlyLowerLedgeredNotes = (chord.highestNote.staffPlace < chord.context.bottomStaffPlace &&
            chord.lowestNote.staffPlace < chord.context.bottomStaffPlace);
        // compensateLedgerNoteStems
        let heightGapToMidLine = 0;
        if (onlyLowerLedgeredNotes) {
            if (this.chord.direction === Music_1.StemDirection.Up) {
                heightGapToMidLine = (chord.context.midStaffPlace - chord.lowestNote.staffPlace - 7) / 2;
            }
        }
        else if (onlyUpperLedgeredNotes) {
            if (this.chord.direction === Music_1.StemDirection.Down) {
                heightGapToMidLine = (chord.highestNote.staffPlace - chord.context.midStaffPlace - 7) / 2;
            }
        }
        this.stemGlyph.height += heightGapToMidLine > 0 ? heightGapToMidLine : 0;
    }
    checkStemOffsets() {
        let chord = this.chord;
        // checkExtraSpaceForLigatures
        let longLigatureNoteTypes = ['32th', '64th', '128th'];
        let extraSpaces = longLigatureNoteTypes.indexOf(chord.type);
        if (extraSpaces > 0) {
            this.stemGlyph.height += extraSpaces;
        }
        // the following is confusing mainly because SMuFL use SW-y and Web uses NW-y
        // also because there is no good way to really have an anchor point for rects
        // may need refactor in the future to improve readability
        let offset;
        let noteAnchors = _1.Glyph.meta.getGlyphAnchors('note-head', chord.type);
        if (this.chord.direction === Music_1.StemDirection.Up) {
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
        this.flagGlyph = new _1.CharGlyph(`flag-${this.chord.direction}`, this.chord.type);
        this.checkFlagOffsets();
        this.append(this.flagGlyph);
    }
    checkFlagOffsets() {
        let flagAnchors = _1.Glyph.meta.getGlyphAnchors(`flag-${this.chord.direction}`, this.chord.type);
        let offset;
        if (this.chord.direction === Music_1.StemDirection.Up) {
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
exports.ChordGlyph = ChordGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hvcmRHbHlwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9FbmdyYXZlcnMvU1ZHRW5ncmF2ZXIvR2x5cGhzL0Nob3JkR2x5cGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBK0Q7QUFDL0Qsd0NBQWdGO0FBRWhGLGdCQUF3QixTQUFRLFFBQUs7SUFRakMsWUFBb0IsS0FBWTtRQUM1QixLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQURULFVBQUssR0FBTCxLQUFLLENBQU87UUFOeEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBR2xDLHFCQUFnQixHQUFnQixFQUFFLENBQUM7UUFNdkMsc0JBQXNCO1FBRXRCLElBQUksZUFBZSxHQUFZLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksR0FBRyxRQUFLLENBQUMsSUFBSSxD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