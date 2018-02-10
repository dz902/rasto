import { NoteHeadGlyph, Glyph, StemGlyph, CharGlyph } from '.';
import { StemDirection, Chord, Note, maybeThen, SimpleMap } from 'Schema/Music';
import { Maybe } from '../../../Utilities';

export class ChordGlyph extends Glyph {
    private hasAdjacentNotes: boolean = false;
    private stemGlyph: Maybe<StemGlyph> = null;
    private flagGlyph: Maybe<CharGlyph> = null;
    private accidentalGlyphs: CharGlyph[] = [];
    // @ts-ignore
    private rawNoteHeadWidth: number;

    constructor(private chord: Chord) {
        super('chord', chord.id);

        // ensureNonEmptyChord

        let chordHasNoNotes: boolean = chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }

        this.drawNotes();
        this.checkStem();
        this.checkFlag();
        this.checkAccidentals();
        this.shiftFromStaffBottom((this.chord.lowestNote.staffPlace - this.chord.context.bottomStaffPlace) / 2);
    }

    get noteHeadWidth(): number {
        if (this.rawNoteHeadWidth === undefined) {
            let bbox = Glyph.meta.getGlyphBBox('note-head', this.chord.markType);

            this.rawNoteHeadWidth = bbox.bBoxNE[0] - bbox.bBoxSW[0];
        }

        return this.rawNoteHeadWidth;
    }

    private drawNotes(): void {
        let isOffsetting = false;

        let drawNote = (note: Note, i: number, notes: Note[]) => {
            let noteHeadGlyph = new NoteHeadGlyph(note);
            let offsetX: number = 0;

            // checkAdjacentNotes

            let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);
            let prevNote = notes[i - 1] ? notes[i - 1] : undefined;
            let isSecond = prevNote && note.getIntervalTo(prevNote) === 2;
            let needsDisplacement = !isOffsetting && isSecond;

            if (this.chord.direction === StemDirection.Up) {
                if (needsDisplacement) {
                    offsetX = this.noteHeadWidth;
                    isOffsetting = true;
                } else {
                    isOffsetting = false;
                }
            } else {
                if (needsDisplacement) {
                    offsetX = 0;
                    isOffsetting = true;
                } else {
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

        if (this.chord.direction === StemDirection.Up) {
            this.chord.notes.forEach(drawNote);
        } else {
            this.chord.notes.concat([]).reverse().forEach(drawNote); // non-destructive
        }
    }

    private checkAccidentals(): void {
        let baseAccidentalGlyph: CharGlyph;

        this.chord.notes
            .filter(note => note.accidental !== null)
            .reverse()
            .forEach((note: Note, i: number, notes: Note[]) => {
                let prevNote = i - 1 >= 0 ? notes[i - 1] : null;
                let accidentalGlyph = new CharGlyph('accidental', note.accidental!.type);

                this.append(accidentalGlyph);

                // moveAccidentalToStaffPlace

                let intervalToLowestNote = note.getIntervalTo(this.chord.lowestNote);

                accidentalGlyph.shiftInterval(intervalToLowestNote);

                // checkDisplacement

                let offsetX = 0;
                let isHighestAccidental = (i === 0);

                if (isHighestAccidental) {
                    baseAccidentalGlyph = accidentalGlyph;
                } else {
                    let isNewBaseAccidental = !accidentalGlyph.overlapsWith(baseAccidentalGlyph);

                    if (isNewBaseAccidental) {
                        // detectNewBaseAccidental

                        baseAccidentalGlyph = accidentalGlyph;
                    } else {
                        // moveToLeftOfPrevAccidental

                        let prevAccidentalGlyph = this.accidentalGlyphs[i - 1];

                        offsetX += prevAccidentalGlyph.bbox.x;

                        accidentalGlyph.move(offsetX);
                        accidentalGlyph.move(-accidentalGlyph.width);

                        // detectCutOuts

                        let anchors = Glyph.meta.getGlyphAnchors('accidental', note.accidental!.type);
                        let prevAnchors = Glyph.meta.getGlyphAnchors('accidental', prevNote!.accidental!.type);
                        let hasCommonCutOutAnchors = anchors['cutOutNE'] && prevAnchors['cutOutSW'];

                        if (hasCommonCutOutAnchors) {
                            let prevBBox = prevAccidentalGlyph.bbox;
                            let bBox = accidentalGlyph.bbox;

                            let prevGlyphCutOutBottomIsHigherThanGlyphTop = (
                                prevBBox.y + prevAccidentalGlyph.height - prevAnchors['cutOutSW'][1] <= bBox.y
                            );
                            let glyphCutOutTopIsLowerThanPrevGlyphBottom = (
                                bBox.y - (accidentalGlyph.height - anchors['cutOutNE'][1]) <= prevBBox.y + prevAccidentalGlyph.height
                            );
                            let kerningNeeded = (
                                prevGlyphCutOutBottomIsHigherThanGlyphTop &&
                                glyphCutOutTopIsLowerThanPrevGlyphBottom
                            );

                            if (kerningNeeded) {
                                let kerningOffsetX = Math.min(
                                    accidentalGlyph.width - anchors['cutOutNE'][0],
                                    prevAnchors['cutOutSW'][0]);

                                accidentalGlyph.move(kerningOffsetX);
                            }
                        }

                    }
                }

                this.accidentalGlyphs.push(accidentalGlyph);
            });

        // checkStemDirectionDisplacement

        let highestAccidentalGlyph = this.accidentalGlyphs[0];

        if (this.chord.direction === StemDirection.Up) {
            if (highestAccidentalGlyph) {
                this.accidentalGlyphs.forEach(a => a.move(-highestAccidentalGlyph.width - 0.2)); // fix with meta
            }
        } else {
            if (this.hasAdjacentNotes) {
                this.accidentalGlyphs.forEach(a => a.move(-highestAccidentalGlyph.width - 0.2)); // fix with meta
            }
        }
    }

    private checkStem(): void {
        if (this.chord.markType === 'whole') {
            return;
        }

        this.stemGlyph = new StemGlyph();
        this.stemGlyph.height = this.chord.spanStaffPlace / 2 + 3.5;  // +1 octave

        this.append(this.stemGlyph);

        // checkLedgerNoteStems

        this.checkLedgerNoteStems();
        this.checkStemOffsets();
    }

    private checkLedgerNoteStems(): void {
        let chord = this.chord;

        let onlyUpperLedgeredNotes = (
            chord.highestNote.staffPlace > (chord.context.bottomStaffPlace + 8) &&
            chord.lowestNote.staffPlace > (chord.context.bottomStaffPlace + 8)
        );
        let onlyLowerLedgeredNotes = (
            chord.highestNote.staffPlace < chord.context.bottomStaffPlace &&
            chord.lowestNote.staffPlace < chord.context.bottomStaffPlace
        );

        // compensateLedgerNoteStems

        let heightGapToMidLine = 0;

        if (onlyLowerLedgeredNotes) {
            if (this.chord.direction === StemDirection.Up) { // in future direction may be forced
                heightGapToMidLine = (chord.context.midStaffPlace - chord.lowestNote.staffPlace - 7) / 2;
            }
        } else if (onlyUpperLedgeredNotes) {
            if (this.chord.direction === StemDirection.Down) {
                heightGapToMidLine = (chord.highestNote.staffPlace - chord.context.midStaffPlace - 7) / 2;
            }
        }

        this.stemGlyph!.height += heightGapToMidLine > 0 ? heightGapToMidLine : 0;
    }

    private checkStemOffsets(): void {
        let chord = this.chord;

        // checkExtraSpaceForLigatures

        let longLigatureNoteTypes = ['32th', '64th', '128th'];
        let extraSpaces = longLigatureNoteTypes.indexOf(chord.markType);

        if (extraSpaces > 0) {
            this.stemGlyph!.height += extraSpaces;
        }

        // the following is confusing mainly because SMuFL use SW-y and Web uses NW-y
        // also because there is no good way to really have an anchor point for rects
        // may need refactor in the future to improve readability

        let offset: { x: number, y: number };
        let noteAnchors = Glyph.meta.getGlyphAnchors('note-head', chord.markType);

        if (this.chord.direction === StemDirection.Up) {
            offset = {
                x: noteAnchors['stemUpSE'][0] - this.stemGlyph!.width,  // move left and make stem inside
                y: -noteAnchors['stemUpSE'][1]                       // move opposite direction
            };

            this.stemGlyph!.height -= noteAnchors['stemUpSE'][1];   // shorten stem to keep tip aligned

            offset.y -= this.stemGlyph!.height;
        } else {
            offset = {
                x: noteAnchors['stemDownNW'][0], // move right, stem already is inside note
                y: -noteAnchors['stemDownNW'][1] // move opposite direction
            };

            // we want stem in the middle, which is natural for up stem notes
            // because it is offseted like that, for down stem notes they are
            // offseted to put stem on the left of note, so we compensate note
            // width to make sure stem in the middle

            this.stemGlyph!.height += noteAnchors['stemDownNW'][1]; // lengthen stem to keep tip aligned

            offset.x += this.noteHeadWidth;
            offset.y -= (this.chord.spanStaffPlace / 2);
        }

        this.stemGlyph!.move(offset.x, offset.y);
    }

    private checkFlag(): void {
        let noFlagNeeded = (
            this.chord.beams.length !== 0 ||
            this.chord.markType === 'whole' ||
            this.chord.markType === 'half' ||
            this.chord.markType === 'quarter'
        );

        if (noFlagNeeded) {
            return;
        }

        this.flagGlyph = new CharGlyph(`flag-${this.chord.direction}`, this.chord.markType);

        this.checkFlagOffsets();

        this.append(this.flagGlyph);
    }

    private checkFlagOffsets(): void {
        let flagAnchors = Glyph.meta.getGlyphAnchors(`flag-${this.chord.direction}`, this.chord.markType);
        let offset: { x: number, y: number };

        if (this.chord.direction === StemDirection.Up) {
            offset = {
                x: flagAnchors['stemUpNW'][0],
                y: flagAnchors['stemUpNW'][1]
            };
        } else {
            offset = {
                x: flagAnchors['stemDownSW'][0],
                y: flagAnchors['stemDownSW'][1] + this.stemGlyph!.height
            };
        }

        this.flagGlyph!.move(this.stemGlyph!.bbox.x, this.stemGlyph!.bbox.y);
        this.flagGlyph!.move(offset.x, offset.y);
    }
}