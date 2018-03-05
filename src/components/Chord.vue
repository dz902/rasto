<template lang="pug">
svg.chord
    svg.chord-body(
    v-bind="remize(chordBody)"
    )
        line.ledger-line(
        v-for="ledgerLine in ledgerLines"
        v-bind="remize(ledgerLine)"
        )
        glyph-component.note-head(
        v-for="noteHead in noteHeads"
        v-bind:key="Math.random()"
        v-bind="remize(noteHead)"
        ) {{ noteHead.textContent }}
        rect.stem(
        v-if="!stem.isVirtual"
        v-bind="remize(stem)"
        )
        glyph-component.flag(
        v-for="flag in flags"
        v-bind:key="Math.random()"
        v-bind="remize(flag)"
        ) {{ flag.textContent }}
        glyph-component.accidental(
        v-for="accidental in accidentals"
        v-bind:key="Math.random()"
        v-bind="remize(accidental)"
        ) {{ accidental.textContent }}
</template>

<script lang="ts">
import Vue from 'vue';
import GlyphComponent from './Glyph.vue';
import {
    Bindings,
    Anchored,
    BBoxed,
    Positioned,
    FlagType,
    GlyphKind,
    MarkType,
    Note,
    StemDirection,
    Coordinates,
    Dimensioned, GlyphMeta, Clipped, StaffBoundaryPositions, Nullable
} from 'types';
import { remize } from 'mixins';
import {
    getIntervalBetween,
    getNotePosition,
    computePositionDiff,
    getStaffBoundaryPositionsFromClef,
    getEngravingDefaults,
    alignToCenter,
    snapTo,
    withAnchor,
    alignToMiddle,
    computeBoundingDimensions,
    getGlyphMeta, computeBBox, computeDimensions, fitFromLeft, withClippingPoints, getStaffLinePositionFromClef
} from 'helpers';
import { at, range, first, last, merge, forEachRight } from 'lodash';

export default Vue.extend({
    name: 'chord',
    props: {
        chord: {
            type: Object,
            required: true
        },
        clef: {
            type: Object,
            required: false
        },
        noFlag: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    computed: {
        ledgerLines() {
            let ledgerLines: Bindings[] = [];

            if (!this.staffBoundaryPositions) {
                return ledgerLines;
            }

            let ledgerLineExtension = getEngravingDefaults('legerLineExtension') * 2;

            let checkDisplacedNotes = (filter: (n: NoteHead, i: number) => boolean): boolean => {
                return this.noteHeads.some((n, i) => filter(n, i) && n.isDisplaced);
            };

            let computeLedgerLineOffset = (ledgerLineWidth: number, ledgerNotesDisplaced: boolean): number => {
                let dummyLedger: Anchored = {
                    anchor: {
                        x: ledgerLineWidth / 2,
                        y: 0
                    }
                };

                let alignmentTarget: Positioned & BBoxed;

                if (ledgerNotesDisplaced) {
                    alignmentTarget = computeBBox(this.stem);
                } else {
                    if (this.stemDownward) {
                        alignmentTarget = last(this.noteHeads) as NoteHead;
                    } else {
                        alignmentTarget = first(this.noteHeads) as NoteHead;
                    }
                }

                let { x } = alignToCenter(dummyLedger, alignmentTarget);

                return x;
            };

            let firstHigherLedgerLinePosition = this.staffBoundaryPositions.highest + 1;

            if (this.highestNotePosition > firstHigherLedgerLinePosition) {
                let ledgerNotesDisplaced = checkDisplacedNotes((n, i) => this.notePositions[i] >= firstHigherLedgerLinePosition);
                let chordWidth = ledgerNotesDisplaced ? this.noteHeadWidth * 2 - this.stemWidth : this.noteHeadWidth;
                let ledgerLineWidth = ledgerLineExtension + chordWidth;
                let extraThirds = this.highestNotePosition - this.staffBoundaryPositions.highest;

                let offsetX = computeLedgerLineOffset(ledgerLineWidth, ledgerNotesDisplaced);

                for (let i = extraThirds % 1, n = extraThirds; i < n; ++i) {
                    let y = -(this.boundaryNoteSpan - i);

                    ledgerLines.push({
                        x1: offsetX,
                        x2: offsetX + ledgerLineWidth,
                        y1: y,
                        y2: y
                    });
                }
            }

            let firstLowerLedgerLinePosition = this.staffBoundaryPositions.lowest - 1;

            if (this.lowestNotePosition < firstLowerLedgerLinePosition) {
                let ledgerNotesDisplaced = checkDisplacedNotes((n, i) => this.notePositions[i] <= firstLowerLedgerLinePosition);
                let chordWidth = ledgerNotesDisplaced ? this.noteHeadWidth * 2 - this.stemWidth : this.noteHeadWidth;
                let ledgerLineWidth = ledgerLineExtension + chordWidth;
                let offsetX = computeLedgerLineOffset(ledgerLineWidth, ledgerNotesDisplaced);
                let extraThirds = this.lowestNotePosition - this.staffBoundaryPositions.lowest;

                for (let i = extraThirds % 1, n = extraThirds; i > n; --i) {
                    ledgerLines.push({
                        x1: offsetX,
                        x2: offsetX + ledgerLineWidth,
                        y1: i,
                        y2: i
                    });
                }
            }

            ledgerLines = ledgerLines.map(l => {
                l['stroke-width'] = getEngravingDefaults('legerLineThickness');

                return l;
            });

            return ledgerLines;
        },
        stem(): Stem {
            // although whole notes does not need stem
            // it could still help aligning ledgers
            // so we keep it here

            let stem: Stem = {
                width: this.stemWidth,
                height: 3.5 + this.boundaryNoteSpan,
                x: 0,
                y: 0,
                isVirtual: this.chord.type === MarkType.Whole
            };

            // checkDistantChordExtension

            if (this.staffBoundaryPositions) {
                if (this.stemDownward &&
                    this.lowestNotePosition > this.staffBoundaryPositions.highest + 1.5) {
                    let diff = computePositionDiff(this.lowestNotePosition, this.staffBoundaryPositions.highest + 1.5);

                    stem.height += diff;
                } else if (!this.stemDownward &&
                    this.highestNotePosition < this.staffBoundaryPositions.lowest - 1.5) {
                    let diff = computePositionDiff(this.highestNotePosition, this.staffBoundaryPositions.lowest - 1.5);

                    stem.height += diff;
                }
            }

            // checkFlagExtension

            if (this.numFlags > 2) {
                stem.height += (this.numFlags - 2) * 0.5;
                stem.height -= this.stemDownward ? 0 : 1;
            }

            // alignStemToNoteHead

            let snapNote: NoteHead = this.stemDownward ? last(this.noteHeads)! : first(this.noteHeads)!;

            let snapNoteAnchors = getGlyphMeta(GlyphKind.NoteHead, this.chord.type).anchors;
            let noteAnchor: Coordinates = { x: 0, y: 0 };

            if (snapNoteAnchors) {
                if (this.stemDownward && snapNoteAnchors['stemDownNW']) {
                    noteAnchor = snapNoteAnchors['stemDownNW'];
                } else if (!this.stemDownward && snapNoteAnchors['stemUpSE']) {
                    noteAnchor = snapNoteAnchors['stemUpSE'];
                }
            }

            stem = snapTo(
                withAnchor(stem, this.stemDownward ? { x: 0, y: 0 } : { x: this.stemWidth, y: stem.height }),
                withAnchor(snapNote, noteAnchor)
            );

            return stem;
        },
        flags(): Flag[] {
            let flags: Flag[] = [];

            if (this.noFlag || this.numFlags === 0) {
                return flags;
            }

            // computeFlagsShift

            let flagBaseType = this.numFlags === 1 ?
                FlagType.N8th + this.chord.stemDirection :
                FlagType.N16th + this.chord.stemDirection;
            let flagGlyphMeta = getGlyphMeta(GlyphKind.Flag, flagBaseType);
            let flagBaseChar: string = flagGlyphMeta.char;

            let flagBase: Flag = {
                textContent: flagBaseChar,
                x: 0,
                y: 0,
                anchor: {
                    x: 0,
                    y: 0
                }
            };

            // alignBaseFlag

            let flagAnchors = flagGlyphMeta.anchors;
            let flagAnchor: Coordinates = { x: 0, y: 0 };

            if (flagAnchors) {
                if (this.stemDownward && flagAnchors['stemDownSW']) {
                    flagAnchor = flagAnchors['stemDownSW'];
                } else if (!this.stemDownward && flagAnchors['stemUpNW']) {
                    flagAnchor = flagAnchors['stemUpNW'];
                }
            }

            flagBase = snapTo(
                withAnchor(flagBase, flagAnchor),
                withAnchor(this.stem, this.stemDownward ? { x: 0, y: this.stem.height } : { x: 0, y: 0 })
            );

            flags.push(flagBase);

            // addInternalFlags

            let flagInternalType = FlagType.Internal + this.chord.stemDirection;
            let flagInternalChar = getGlyphMeta(GlyphKind.Flag, flagInternalType).char;
            let flagInternalSpacing = 0.8 * (this.stemDownward ? -1 : 1);

            for (let i = 2, j = 0; i < this.numFlags; ++i, ++j) {
                let flag: Flag = {
                    textContent: flagInternalChar,
                    x: flagBase.x,
                    y: flagBase.y - 1.55 + (j * flagInternalSpacing)
                };

                flags.push(flag);
            }

            return flags;
        },
        noteHeads(): NoteHead[] {
            let noteHeadsBindings: NoteHead[] = [];

            // computedDisplacement

            let addDisplacement = (noteHeadsBindings: NoteHead[], note: Note, i: number, notes: Note[]) => {
                let prevNote = notes[i - 1];
                let adjacentNoteFound = prevNote !== undefined && getIntervalBetween(note, prevNote) === 2;
                let isDisplaced = adjacentNoteFound && !noteHeadsBindings[i - 1].isDisplaced;

                let x = 0;

                if (this.stemDownward) {
                    if (isDisplaced) {
                        x = this.stemWidth;
                    } else {
                        x = this.noteHeadWidth;
                    }
                } else {
                    if (isDisplaced) {
                        x = this.noteHeadWidth * 2;
                    } else {
                        x = this.noteHeadWidth;
                    }
                }

                x -= this.stemWidth;

                noteHeadsBindings.push({
                    textContent: this.noteHeadGlyphMeta.char,
                    x: x,
                    y: 0,
                    isDisplaced: isDisplaced,
                    bBox: this.noteHeadGlyphMeta.bBox
                });

                return noteHeadsBindings;
            };

            if (this.stemDownward) {
                noteHeadsBindings = (Array.from(this.chord.notes) as Note[]).reverse().reduce(addDisplacement, []).reverse();
            } else {
                noteHeadsBindings = this.chord.notes.reduce(addDisplacement, []);
            }

            // computeShift

            noteHeadsBindings = noteHeadsBindings.map((n: NoteHead, i) => {
                n.y = -(this.notePositions[i] - this.lowestNotePosition);

                return n;
            });

            return noteHeadsBindings;
        },
        accidentals(): Accidental[] {
            let accidentals: Accidental[] = [];
            let accidentalBase: Accidental;
            let lastAccidental: Accidental;

            forEachRight(this.chord.notes, (note: Note, i: number) => {
                if (!note.accidental) {
                    return;
                }

                let accidentalGlyphMeta = getGlyphMeta(GlyphKind.Accidental, note.accidental.type);
                let accidentalChar = accidentalGlyphMeta.char;

                let accidental: Accidental = {
                    textContent: accidentalChar,
                    x: this.stemDownward ? -this.noteHeadWidth : 0,
                    y: 0,
                    bBox: accidentalGlyphMeta.bBox,
                    clippingPoints: accidentalGlyphMeta.clippingPoints
                };

                accidental = alignToMiddle(
                    withAnchor(accidental, { x: 0, y: 0 }),
                    this.noteHeads[i]
                );

                let accidentalNotOverlapWithBase = !accidentalBase || (
                    accidentalBase &&
                    (accidental.x + accidental.bBox.NE.x) === (accidentalBase.x + accidentalBase.bBox.NE.x)
                );

                if (accidentalNotOverlapWithBase) {
                    accidentalBase = accidental;
                } else {
                    accidental = fitFromLeft(accidental, lastAccidental);
                }

                if (!accidentalBase) {
                    accidentalBase = accidental;
                }

                lastAccidental = accidental;

                accidentals.push(accidental);
            });

            return accidentals;
        },
        chordBody(): Bindings {
            let x = 0;
            let y = 0;

            // computeAccidentalOffset

            let accidentalsWidth = this.accidentals.length > 0 ? computeBoundingDimensions(this.accidentals).width : 0;

            if (this.stemDownward) {
                accidentalsWidth += this.noteHeadWidth;
            } else {
                accidentalsWidth -= this.noteHeadWidth;
            }

            x = accidentalsWidth + 0.2;

            // computeShift

            if (this.staffBoundaryPositions) {
                y = this.staffBoundaryPositions.highest - this.lowestNotePosition;
            }

            return {
                x,
                y
            };
        },
        noteHeadGlyphMeta(): GlyphMeta {
            return getGlyphMeta(GlyphKind.NoteHead, this.chord.type);
        },
        noteHeadWidth(): number {
            return computeDimensions(this.noteHeadGlyphMeta).width;
        },
        notePositions(): number[] {
            return this.chord.notes.map(getNotePosition);
        },
        lowestNotePosition(): number {
            return this.notePositions[0];
        },
        highestNotePosition(): number {
            return last(this.notePositions) || this.lowestNotePosition;
        },
        boundaryNoteSpan(): number {
            return computePositionDiff(this.lowestNotePosition, this.highestNotePosition);
        },
        stemWidth(): number {
            return getEngravingDefaults('stemThickness');
        },
        stemDownward(): boolean {
            return this.chord.stemDirection === StemDirection.Down;
        },
        numFlags(): number {
            // needed by stem to compute height

            let numLookup: number = [
                MarkType.Quarter,
                MarkType.N8th, MarkType.N16th,
                MarkType.N32th, MarkType.N64th,
                MarkType.N128th
            ].indexOf(this.chord.type);

            let numFlags: number = numLookup === -1 ? 0 : numLookup;

            return numFlags;
        },
        staffBoundaryPositions(): Nullable<StaffBoundaryPositions> {
            return this.clef ? getStaffBoundaryPositionsFromClef(this.clef) : null;
        }
    },
    components: {
        GlyphComponent
    },
    mixins: [
        remize
    ]
});

interface NoteHead extends BBoxed, Positioned {
    isDisplaced: boolean;
}

interface Stem extends Dimensioned, Positioned {
    isVirtual: boolean;
}

interface Flag extends Positioned {
}

interface Accidental extends Positioned, BBoxed, Clipped {

}
</script>

<style lang="sass" scoped>
rect.stem
    fill: black

text.flag
    fill: rgba(0, 0, 0, 0.5)

line.ledger-line
    stroke: black
</style>